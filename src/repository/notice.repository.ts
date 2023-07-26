import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from '../models/Notice.entity';
import { Repository } from 'typeorm';
import { CreateNoticeType } from '../modules/notice/dto/types/create.types';

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
}
