import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from '../models/Notice.entity';
import { Repository } from 'typeorm';
import { CreateNoticeType } from '../modules/notice/dto/types/create.types';
import { GetSubscribeNoticesQueryDto } from '../modules/notice/dto/request/getSubscribeNotices.request.dto';
import { GetSubscribeNoticeQueryDto } from '../modules/user/dto/request/getSubscribeNotice.query.dto';

@Injectable()
export class NoticeRepository {
    constructor(
        @InjectRepository(Notice)
        private noticeRepository: Repository<Notice>,
    ) {}

    async create(data: CreateNoticeType): Promise<Notice> {
        const { title, content, school } = data;
        const notice = this.noticeRepository.create();
        notice.title = title;
        notice.content = content;
        notice.school = school;
        return await this.noticeRepository.save(notice);
    }

    async update(noticeId: number, data: any): Promise<void> {
        await this.noticeRepository
            .createQueryBuilder('n')
            .update()
            .set(data)
            .where('id = :noticeId', { noticeId })
            .execute();
    }

    async findOneByNoticeId(noticeId: number): Promise<Notice | null> {
        return await this.noticeRepository
            .createQueryBuilder('n')
            .where('id = :noticeId', { noticeId })
            .getOne();
    }

    async getOneByNoticeIdAndUserId(noticeId: number, userId: number): Promise<Notice | null> {
        return await this.noticeRepository
            .createQueryBuilder('n')
            .innerJoin('n.school', 's')
            .leftJoin('s.user', 'u')
            .where('n.id = :noticeId', { noticeId })
            .andWhere('u.id = :userId', { userId })
            .getOne();
    }

    async getManyByPaging(
        schoolId: number,
        data: GetSubscribeNoticesQueryDto,
    ): Promise<[Notice[], number]> {
        const { page, perPage } = data;
        return await this.noticeRepository
            .createQueryBuilder('n')
            .innerJoin('n.school', 's')
            .where('s.id = :schoolId', { schoolId })
            .skip(Number(page) * Number(perPage))
            .take(Number(perPage))
            .orderBy('n.createdAt', 'DESC') // * 최신순 정렬
            .getManyAndCount();
    }

    async getManyStartDateAndEndDate(
        schoolId: number,
        startDate: Date,
        endDate: Date | null,
    ): Promise<Notice[]> {
        const query = this.noticeRepository
            .createQueryBuilder('n')
            .select(['n.id'])
            .innerJoin('n.school', 's')
            .where('s.id = :schoolId', { schoolId })
            .andWhere('n.createdAt >= :startDate', { startDate });

        if (endDate) {
            query.andWhere('n.createdAt <= :endDate', { endDate });
        }
        return query.getMany();
    }

    async getManyAndCountByNoticeIds(
        noticeIds: number[],
        data: GetSubscribeNoticeQueryDto,
    ): Promise<[Notice[], number]> {
        const { page, perPage } = data;
        return await this.noticeRepository
            .createQueryBuilder('n')
            .innerJoinAndSelect('n.school', 's')
            .where('n.id IN (:noticeIds)', { noticeIds })
            .skip(Number(page) * Number(perPage))
            .take(Number(perPage))
            .orderBy('n.createdAt', 'DESC') // * 최신순 정렬
            .getManyAndCount();
    }
}
