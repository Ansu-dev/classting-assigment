import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location, School } from '../models/School.entity';
import { CreateSchoolPageType } from '../modules/school/dto/types/create.types';
import { Brackets, Repository } from 'typeorm';
import { GetSchoolsQueryDto } from '../modules/school/dto/request/getSchool.query.dto';

@Injectable()
export class SchoolRepository {
    constructor(
        @InjectRepository(School)
        private schoolRepository: Repository<School>,
    ) {}

    async create(data: CreateSchoolPageType): Promise<void> {
        const { location, name, user } = data;
        const school = this.schoolRepository.create();
        school.location = location;
        school.name = name;
        school.user = user;
        await this.schoolRepository.save(school);
    }

    async save(school: School): Promise<School> {
        return await this.schoolRepository.save(school);
    }

    async findOneBySchoolId(schoolId: number): Promise<School | null> {
        return await this.schoolRepository
            .createQueryBuilder('s')
            .where('id = :schoolId', { schoolId })
            .getOne();
    }

    async getOneLocationAndName(location: Location, name: string): Promise<School | null> {
        return await this.schoolRepository
            .createQueryBuilder('s')
            .where('location = :location', { location })
            .andWhere("REGEXP_REPLACE(name, '\\\\s', '') = REGEXP_REPLACE(:name, '\\\\s', '')", {
                name,
            }) // * 공백제거해서 비교
            .getOne();
    }

    async getManyAndCountFilter(filter: GetSchoolsQueryDto): Promise<[School[], number]> {
        const { page, perPage, search } = filter;
        const query = this.schoolRepository
            .createQueryBuilder('s')
            .skip(Number(page) * Number(perPage))
            .take(Number(perPage))
            .orderBy('createdAt', 'DESC'); // * 최신 등록 순

        if (search) {
            query.where(
                new Brackets((qb) => {
                    qb.orWhere('location = :location', { location: search });
                    qb.orWhere('name like :name', { name: `%${search}%` });
                }),
            );
        }
        return await query.getManyAndCount();
    }
}
