import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscribe } from '../models/Subscribe.entity';
import { Repository } from 'typeorm';
import { User } from '../models/User.entity';
import { School } from '../models/School.entity';
import { GetSchoolsQueryDto } from 'src/modules/school/dto/request/getSchool.query.dto';

@Injectable()
export class SubscribeRepository {
    constructor(
        @InjectRepository(Subscribe)
        private subscribeRepository: Repository<Subscribe>,
    ) {}

    async create(user: User, school: School): Promise<Subscribe> {
        const subscribe = this.subscribeRepository.create();
        subscribe.user = user;
        subscribe.school = school;
        subscribe.subscribeDate = new Date();
        return await this.subscribeRepository.save(subscribe);
    }

    async save(subscribe: Subscribe): Promise<Subscribe> {
        return await this.subscribeRepository.save(subscribe);
    }

    async findOneByUserIdAndSchoolId(userId: number, schoolId: number): Promise<Subscribe | null> {
        return await this.subscribeRepository
            .createQueryBuilder('sub')
            .innerJoin('sub.user', 'u')
            .innerJoin('sub.school', 's')
            .where('u.id = :userId', { userId })
            .andWhere('s.id = :schoolId', { schoolId })
            .getOne();
    }

    async getOneBySubscribe(userId: number, schoolId: number): Promise<Subscribe | null> {
        return await this.subscribeRepository
            .createQueryBuilder('sub')
            .innerJoin('sub.user', 'u')
            .innerJoin('sub.school', 's')
            .where('u.id = :userId', { userId })
            .andWhere('s.id = :schoolId', { schoolId })
            .andWhere('sub.subscribe = 1')
            .getOne();
    }

    async getOneByUnsubscribe(userId: number, schoolId: number): Promise<Subscribe | null> {
        return await this.subscribeRepository
            .createQueryBuilder('sub')
            .innerJoin('sub.user', 'u')
            .innerJoin('sub.school', 's')
            .where('u.id = :userId', { userId })
            .andWhere('s.id = :schoolId', { schoolId })
            .andWhere('sub.subscribe = 0')
            .getOne();
    }

    async getManyAndRowBySubscribe(
        userId: number,
        data: GetSchoolsQueryDto,
    ): Promise<[Subscribe[], number]> {
        const { page, perPage } = data;
        return await this.subscribeRepository
            .createQueryBuilder('sub')
            .innerJoin('sub.user', 'u')
            .innerJoinAndSelect('sub.school', 's')
            .where('u.id = :userId', { userId })
            .andWhere('sub.subscribe = 1')
            .skip(Number(page) * Number(perPage))
            .take(Number(perPage))
            .getManyAndCount();
    }
}
