import { Injectable } from '@nestjs/common';
import { SchoolRepository } from '../../repository/school.repository';
import { UserRepository } from '../../repository/user.repository';
import { CreateSchoolPageRequestDto } from './dto/request/create.request.dto';
import { Location } from '../../models/School.entity';
import { throwError } from '../../config/errorMessage.config';
import { GetSchoolsQueryDto } from './dto/request/getSchool.query.dto';
import { GetSchoolResData } from './dto/response/getSchool.response.dto';
import { SubscribeRepository } from '../../repository/subscribe.repository';

@Injectable()
export class SchoolService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly schoolRepository: SchoolRepository,
        private readonly subscribeRepository: SubscribeRepository,
    ) {}

    // * 학교 페이지 생성
    async create(userId: number, body: CreateSchoolPageRequestDto) {
        const { location, name } = body;
        // * 유저가 실제 존재하는 유저인지 판별
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return throwError(401, 10000);
        }
        // * 위치 + 학교명이 같은 페이지가 개설된것이 있는지 판별
        await this.schoolNameValidator(location, name);

        const schoolData = {
            location: location,
            name: name,
            user: user,
        };
        await this.schoolRepository.create(schoolData);
        return { resultCode: 1, data: null };
    }

    async getSubscribeSchool(userId: number, query: GetSchoolsQueryDto) {
        // * 유저가 실제 존재하는 유저인지 판별
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return throwError(401, 10000);
        }
        const items: GetSchoolResData[] = [];
        // * 현재 구독중인 학교 페이지
        const [rows, count] = await this.subscribeRepository.getManyAndRowBySubscribe(userId, query);

        // * 구독 중인 페이지 목록
        for (const row of rows) {
            const school = row.school;
            items.push({
                schoolId: school.id,
                location: school.location,
                name: school.name,
                createdAt: school.createdAt,
            });
        }
        return { resultCode: 1, data: { items, count } };
    }

    async subscribeSchool(schoolId: number, userId: number) {
        // TODO : 구독 판별해서 이미 존재하면 이미 구독이 된 학교 페이지
        // TODO : 구독 데이터는 있지만 이전에 구독했다 취소한 경우는 update
        // TODO : 구독이 존재하지 않으면 새로운 데이터 생성
        // * 유저가 실제 존재하는 유저인지 판별
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return throwError(401, 10000);
        }
        const school = await this.schoolRepository.findOneBySchoolId(schoolId);
        if (!school) {
            return throwError(404, 12001);
        }

        // * 학교페이지 구독여부 판별
        await this.subscribeValidator(schoolId, userId);

        // * 구독 생성 or 재 구독 확인
        const subscribe = await this.subscribeRepository.findOneByUserIdAndSchoolId(userId, schoolId);
        if (subscribe) {
            subscribe.subscribe = true;
            subscribe.subscribeDate = new Date();
            subscribe.unsubscribeDate = null;
            await this.subscribeRepository.save(subscribe);
        } else {
            await this.subscribeRepository.create(user, school);
        }
        return { resultCode: 1, data: null };
    }

    async unsubscibeSchool(schoolId: number, userId: number) {
        // TODO : 구독의 유무 확인
        // TODO : 이미 구독이 취소되어있다면 동작x
        // TODO : 구독을 취소할 경우 상태를 false, 취소 시간을 기입
        // * 유저가 실제 존재하는 유저인지 판별
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return throwError(401, 10000);
        }
        const school = await this.schoolRepository.findOneBySchoolId(schoolId);
        if (!school) {
            return throwError(404, 12001);
        }

        const subscribe = await this.subscribeRepository.findOneByUserIdAndSchoolId(userId, schoolId);
        if (!subscribe) {
            return throwError(404, 12012);
        }

        // * 학교페이지 구독취소여부 판별
        await this.unsubscribeValidator(schoolId, userId);

        subscribe.subscribe = false;
        subscribe.unsubscribeDate = new Date();
        await this.subscribeRepository.save(subscribe);

        return { resultCode: 1, data: null };
    }

    // ! 검증 함수
    async schoolNameValidator(location: Location, name: string): Promise<void> {
        const school = await this.schoolRepository.getOneLocationAndName(location, name);
        // * 만약 이미 학교페이지가 존재할 경우
        if (school) {
            return throwError(400, 12000);
        }
    }

    async subscribeValidator(schoolId: number, userId: number): Promise<void> {
        const subscribe = await this.subscribeRepository.getOneBySubscribe(userId, schoolId);
        if (subscribe) {
            return throwError(400, 12010);
        }
    }

    async unsubscribeValidator(schoolId: number, userId: number): Promise<void> {
        const subscribe = await this.subscribeRepository.getOneByUnsubscribe(userId, schoolId);
        if (subscribe) {
            return throwError(400, 12011);
        }
    }
}
