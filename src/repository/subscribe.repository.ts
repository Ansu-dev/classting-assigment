import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscribe } from '../models/Subscribe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscribeRepository {
    constructor(
        @InjectRepository(Subscribe)
        private subscribeRepository: Repository<Subscribe>,
    ) {}

    async findOneByUserIdAndSchoolId(userId: number, schoolId: number): Promise<Subscribe | null> {
        return await this.subscribeRepository
            .createQueryBuilder('sub')
            .innerJoin('sub.user', 'u')
            .innerJoin('sub.school', 's')
            .where('u.id = :userId', { userId })
            .andWhere('s.id = :schoolId', { schoolId })
            .andWhere('sub.subscribe = 1')
            .getOne();
    }
}
