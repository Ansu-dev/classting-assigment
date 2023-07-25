import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location, School } from '../models/School.entity';
import { CreateSchoolPageType } from '../modules/school/dto/types/create.types';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolRepository {
    constructor(
        @InjectRepository(School)
        private schoolRepository: Repository<School>,
    ) {}

    async create(data: CreateSchoolPageType): Promise<School> {
        const { location, name, user } = data;
        const school = this.schoolRepository.create();
        school.location = location;
        school.name = name;
        school.user = user;
        return await this.schoolRepository.save(school);
    }

    async save(school: School): Promise<School> {
        return await this.schoolRepository.save(school);
    }

    async getOneLocationAndName(location: Location, name: string): Promise<School | null> {
        return await this.schoolRepository
            .createQueryBuilder('s')
            .where('location = :location', { location })
            .andWhere('name = :name', { name })
            .getOne();
    }
}
