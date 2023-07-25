import { Injectable } from '@nestjs/common';
import { SchoolRepository } from '../../repository/school.repository';
import { UserRepository } from '../../repository/user.repository';
import { CreateSchoolPageRequestDto } from './dto/request/create.request.dto';

@Injectable()
export class SchoolService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly schoolRepository: SchoolRepository,
    ) {}

    // * 학교 페이지 생성
    async create(userId: number, body: CreateSchoolPageRequestDto) {
        // TODO : 유저가 실제 존재하는 유저인지 판별
        // TODO : 위치 + 학교명이 같은 페이지가 개설된것이 있는지 판별
    }

    async schoolNameValidator(location: string, name: string) {}
}
