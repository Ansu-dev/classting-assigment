import { Injectable } from '@nestjs/common';
import { SchoolRepository } from '../../repository/school.repository';
import { UserRepository } from '../../repository/user.repository';
import { CreateSchoolPageRequestDto } from './dto/request/create.request.dto';
import { Location } from '../../models/School.entity';
import { throwError } from '../../config/errorMessage.config';

@Injectable()
export class SchoolService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly schoolRepository: SchoolRepository,
    ) {}

    // * 학교 페이지 생성
    async create(userId: number, body: CreateSchoolPageRequestDto) {
        const { location, name } = body;
        // TODO : 유저가 실제 존재하는 유저인지 판별
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return throwError(401, 10000);
        }
        // TODO : 위치 + 학교명이 같은 페이지가 개설된것이 있는지 판별
        this.schoolNameValidator(location, name);

        const schoolData = {
            location: location,
            name: name,
            user: user,
        };
        await this.schoolRepository.create(schoolData);
        return { resultCode: 1, data: null };
    }

    async schoolNameValidator(location: Location, name: string): Promise<void> {
        const school = await this.schoolRepository.getOneLocationAndName(location, name);
        // * 만약 이미 학교페이지가 존재할 경우
        if (school) {
            return throwError(400, 11000);
        }
    }
}
