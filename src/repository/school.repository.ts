import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from 'src/models/School.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolRepository {
    constructor(
        @InjectRepository(School)
        private schoolRepository: Repository<School>,
    ) {}

    create(): School {
        return this.schoolRepository.create();
    }

    async save(school: School): Promise<School> {
        return await this.schoolRepository.save(school);
    }
}
