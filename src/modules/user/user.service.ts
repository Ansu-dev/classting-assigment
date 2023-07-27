import { Injectable } from '@nestjs/common';
import { throwError } from '../../config/errorMessage.config';
import { NoticeRepository } from '../../repository/notice.repository';
import { SubscribeRepository } from '../../repository/subscribe.repository';
import { UserRepository } from '../../repository/user.repository';
import { GetSubscribeNoticeQueryDto } from './dto/request/getSubscribeNotice.query.dto';
import { GetSubscribeNoticeData } from './dto/response/getSubscribeNotice.response.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly subscribeRepository: SubscribeRepository,
        private readonly noticeRepository: NoticeRepository,
    ) {}

    async getSubscribeNotices(userId: number, query: GetSubscribeNoticeQueryDto) {
        // TODO : 구독중인 모든 학교의 소식을 모아봐야함
        // TODO : 최신순으로 정렬(소식 최신순)
        // TODO : 구독한 시점부터의 소식을 뉴스피드에 노출
        // TODO : 구독 취소해도 구독한 시점 ~ 구독 취소까지의 소식은 계속 노출
        // * 유저가 실제 존재하는 유저인지 판별
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return throwError(401, 10000);
        }

        let mergeNoticeIds: number[] = [];
        // * 구독 이력을 모두 가져옴
        const subscribes = await this.subscribeRepository.findManyByUserId(userId);
        for (const subscribe of subscribes) {
            // * 구독한 학교페이지를 가져옴
            const subscribeDate = subscribe.subscribeDate; // * 구독 시작 날짜
            const unsubscribeDate = subscribe.unsubscribeDate; // * 구독 취소 날짜

            const school = subscribe.school;
            const schoolId = school.id;

            // * 구독시점 ~ 부터의 소식 or 구독시점 ~ 구독취소까지의 조건에 부합하는 소식들
            const notices = await this.noticeRepository.getManyStartDateAndEndDate(
                schoolId,
                subscribeDate,
                unsubscribeDate,
            );

            // * 기존의 배열에서 noticeId를 누적으로 쌓음
            mergeNoticeIds = mergeNoticeIds.concat(notices.map((n) => n.id));
        }
        // * 중복 제거(만약의 중복값이 끼어들어갔을 경우)
        mergeNoticeIds = Array.from(new Set(mergeNoticeIds));

        // * merge된 소식을 날짜 순으로 정렬
        const items: GetSubscribeNoticeData[] = [];
        const [rows, count] = await this.noticeRepository.getManyAndCountByNoticeIds(mergeNoticeIds, query);
        for (const notice of rows) {
            const school = notice.school;
            items.push({
                noticeId: notice.id,
                location: school.location,
                name: school.name,
                title: notice.title,
                content: notice.content,
                createdAt: notice.createdAt,
            });
        }
        return { resultCode: 1, data: { items, count } };
    }
}
