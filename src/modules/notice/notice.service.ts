import { Injectable } from '@nestjs/common';
import { NoticeRepository } from '../../repository/notice.repository';
import { SchoolRepository } from '../../repository/school.repository';
import { SubscribeRepository } from '../../repository/subscribe.repository';
import { UserRepository } from '../../repository/user.repository';
import { WriteNoticeRequestDto } from './dto/request/writeNotice.request.dto';
import { throwError } from '../../config/errorMessage.config';
import { CreateNoticeType } from './dto/types/create.types';
import { UpdateNoticeRequestDto } from './dto/request/updateNotice.request.dto';
import { DeleteNoticeType } from './dto/types/delete.types';
import { GetSubscribeNoticesData } from './dto/response/getSubscribeNotices.response.dto';
import { GetSubscribeNoticesQueryDto } from './dto/request/getSubscribeNotices.request.dto';

@Injectable()
export class NoticeService {
    constructor(
        private readonly noticeRepository: NoticeRepository,
        private readonly userRepository: UserRepository,
        private readonly schoolRepository: SchoolRepository,
        private readonly subscribeRepository: SubscribeRepository,
    ) {}

    async writeNotice(userId: number, body: WriteNoticeRequestDto) {
        const { title, content, schoolId } = body;
        // TODO : 해당 학교 페이지의 관리자인지 판별
        // * 유저가 실제 존재하는 유저인지 판별
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return throwError(401, 10000);
        }
        // * 학교 페이지 유무 판별
        const school = await this.schoolRepository.findOneBySchoolId(schoolId);
        if (!school) {
            return throwError(404, 12001);
        }

        // * 해당 학교 페이지가 관리자가 맞는지 검증
        await this.schoolPageValidate(userId, schoolId);

        const createData: CreateNoticeType = {
            title: title,
            content: content,
            school: school,
        };
        await this.noticeRepository.create(createData);
        return { resultCode: 1, data: null };
    }

    async updateNotice(userId: number, noticeId: number, body: UpdateNoticeRequestDto) {
        const { title, content } = body;
        // * 유저가 실제 존재하는 유저인지 판별
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return throwError(401, 10000);
        }
        // * 실제 소식이 존재하는지 판별
        const notice = await this.noticeRepository.findOneByNoticeId(noticeId);
        if (!notice) {
            return throwError(404, 12020);
        }

        // * 해당 유저가 학교페이지의 관리자인지 판별
        await this.noticeValidate(userId, noticeId);

        if (title || content) {
            await this.noticeRepository.update(noticeId, body);
        }
        return { resultCode: 1, data: null };
    }

    async deleteNotice(userId: number, noticeId: number) {
        // * 유저가 실제 존재하는 유저인지 판별
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return throwError(401, 10000);
        }
        // * 실제 소식이 존재하는지 판별
        const notice = await this.noticeRepository.findOneByNoticeId(noticeId);
        if (!notice) {
            return throwError(404, 12020);
        }

        // * 해당 유저가 학교페이지의 관리자인지 판별
        await this.noticeValidate(userId, noticeId);

        const deleteData: DeleteNoticeType = {
            enable: false,
            deletedAt: new Date(),
        };
        await this.noticeRepository.update(noticeId, deleteData);
        return { resultCode: 1, data: null };
    }

    async getSubscribeNotices(userId: number, schoolId: number, query: GetSubscribeNoticesQueryDto) {
        // * 유저가 실제 존재하는 유저인지 판별
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return throwError(401, 10000);
        }

        // * 학교 페이지 유무 판별
        const school = await this.schoolRepository.findOneBySchoolId(schoolId);
        if (!school) {
            return throwError(404, 12001);
        }

        // * 해당 학교의 구독 유무 확인
        const items: GetSubscribeNoticesData[] = [];
        let count = 0;
        const subscribe = await this.subscribeRepository.findOneByUserIdAndSchoolId(userId, schoolId);
        // * 구독이 존재하고 구독취소가 되어있는 상태가 아니라면
        if (subscribe && subscribe.subscribe) {
            const [rows, cnt] = await this.noticeRepository.getManyByPaging(schoolId, query);
            for (const notice of rows) {
                items.push({
                    noticeId: notice.id,
                    title: notice.title,
                    content: notice.content,
                    createdAt: notice.createdAt,
                });
            }
            count = cnt;
        }
        return { resultCode: 1, data: { items, count } };
    }

    // ! Validate
    async schoolPageValidate(userId: number, schoolId: number): Promise<void> {
        const school = await this.schoolRepository.getOneBySchooIdAndUserId(userId, schoolId);
        if (!school) {
            return throwError(401, 10002);
        }
    }

    async noticeValidate(userId: number, noticeId: number): Promise<void> {
        const notice = await this.noticeRepository.getOneByNoticeIdAndUserId(noticeId, userId);
        if (!notice) {
            return throwError(401, 10003);
        }
    }
}
