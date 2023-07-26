import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from '../models/Notice.entity';
import { Repository } from 'typeorm';
import { CreateNoticeType } from '../modules/notice/dto/types/create.types';
import { UpdateNoticeRequestDto } from '../modules/notice/dto/request/updateNotice.request.dto';

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

    async update(userId: number, noticeId: number, data: any): Promise<void> {
        await this.noticeRepository
            .createQueryBuilder('n')
            .innerJoin('n.school', 's')
            .innerJoin('s.user', 'u')
            .update()
            .set(data)
            .where('u.id = :userId', { userId })
            .andWhere('n.id = :noticeId', { noticeId })
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
            .innerJoin('s.user', 'u')
            .where('n.id = :noticeId', { noticeId })
            .andWhere('u.id = :userId', { userId })
            .getOne();
    }
}
