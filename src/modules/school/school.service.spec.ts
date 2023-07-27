import { Test, TestingModule } from '@nestjs/testing';
import { SchoolService } from './school.service';
import { SchoolRepository } from '../../repository/school.repository';
import { UserRepository } from '../../repository/user.repository';
import { Location } from '../../models/School.entity';
import { SubscribeRepository } from '../../repository/subscribe.repository';
import { MockRepositoryType, getMockRepository } from '../../config/mockRepository.config';

describe('ShoolService', () => {
    let service: SchoolService;
    let schoolRepository: MockRepositoryType<SchoolRepository>;
    let userRepository: MockRepositoryType<UserRepository>;
    let subscribeRepository: MockRepositoryType<SubscribeRepository>;

    const userObject = {
        id: 1,
        email: 'ansu1007@naver.com',
        password: '$2b$10$liaDExibnpj5jwRAdeAp5uFHnUEkueqnKW7XNoyxJi9y/RhZX8WCC',
        name: '관리자',
    };

    const schoolObject = {
        id: 1,
        location: Location.seoul,
        name: '중앙고등학교',
    };

    const subscribeObject = {
        userId: 1,
        schoolId: 1,
        subscribe: true,
    };

    const unsubscribeObject = {
        userId: 1,
        schoolId: 1,
        subscribe: false,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SchoolService,
                {
                    provide: SchoolRepository,
                    useValue: getMockRepository(SchoolRepository),
                },
                {
                    provide: UserRepository,
                    useValue: getMockRepository(UserRepository),
                },
                {
                    provide: SubscribeRepository,
                    useValue: getMockRepository(SubscribeRepository),
                },
            ],
        }).compile();

        service = module.get<SchoolService>(SchoolService);
        schoolRepository = module.get<SchoolRepository>(SchoolRepository);
        userRepository = module.get<UserRepository>(UserRepository);
        subscribeRepository = module.get<SubscribeRepository>(SubscribeRepository);
    });

    describe('학교 페이지 생성', () => {
        it('정상적인 생성 완료', async () => {
            const userId = 1;
            const body = {
                location: Location.seoul,
                name: '중앙고등학교',
            };
            // * 유저 검증을 통과 가정
            jest.spyOn(userRepository, 'findOneById').mockResolvedValue(userObject);

            await service.create(userId, body);
            // * 저장 함수 1번 실행
            expect(schoolRepository.create).toHaveBeenCalledTimes(1);
        });

        it('[Error] 같은 위치,학교가 존재할 경우', async () => {
            const body = {
                location: Location.seoul,
                name: '중앙고등학교',
            };

            jest.spyOn(schoolRepository, 'getOneLocationAndName').mockResolvedValue(schoolObject);

            try {
                await service.schoolNameValidator(body.location, body.name);
            } catch (error: any) {
                // * throwError에 대한 처리
                expect(error.response.resultCode).toEqual(-12000);
                expect(error.response.data).toBe('이미 존재하는 학교페이지 입니다.');
            }
        });
    });

    describe('구독 하기', () => {
        it('구독 생성', async () => {
            const userId = 1;
            const schoolId = 1;
            // * 유저 검증을 통과 가정
            jest.spyOn(userRepository, 'findOneById').mockResolvedValue(userObject);

            // * 학교 페이지 검증을 통과 가정
            jest.spyOn(schoolRepository, 'findOneBySchoolId').mockResolvedValue(schoolObject);

            // * 구독 여부 확인
            jest.spyOn(subscribeRepository, 'findOneByUserIdAndSchoolId').mockResolvedValue(null);

            await service.subscribeSchool(schoolId, userId);
            // * 저장 함수 1번 실행
            expect(subscribeRepository.create).toHaveBeenCalledTimes(1);
        });
        it('재구독', async () => {
            const userId = 1;
            const schoolId = 1;
            // * 유저 검증을 통과 가정
            jest.spyOn(userRepository, 'findOneById').mockResolvedValue(userObject);

            // * 학교 페이지 검증을 통과 가정
            jest.spyOn(schoolRepository, 'findOneBySchoolId').mockResolvedValue(schoolObject);

            // * 구독 여부 확인
            jest.spyOn(subscribeRepository, 'findOneByUserIdAndSchoolId').mockResolvedValue(
                unsubscribeObject,
            );

            await service.subscribeSchool(schoolId, userId);

            // * 저장 함수 1번 실행
            expect(subscribeRepository.save).toHaveBeenCalledTimes(1);
        });

        it('[Error] 이미 구독이된 학교 페이지', async () => {
            const userId = 1;
            const schoolId = 1;
            jest.spyOn(subscribeRepository, 'getOneBySubscribe').mockResolvedValue(subscribeObject);
            try {
                await service.subscribeValidator(schoolId, userId);
            } catch (error: any) {
                expect(error.response.resultCode).toEqual(-12010);
                expect(error.response.data).toBe('이미 구독된 학교페이지 입니다.');
            }
        });
    });

    describe('구독 취소', () => {
        it('구독 취소 성공', async () => {
            const userId = 1;
            const schoolId = 1;

            // * 유저 검증을 통과 가정
            jest.spyOn(userRepository, 'findOneById').mockResolvedValue(userObject);

            // * 학교 페이지 검증을 통과 가정
            jest.spyOn(schoolRepository, 'findOneBySchoolId').mockResolvedValue(schoolObject);

            // * 구독 여부 확인
            jest.spyOn(subscribeRepository, 'findOneByUserIdAndSchoolId').mockResolvedValue(
                subscribeObject,
            );

            await service.unsubscibeSchool(schoolId, userId);

            // * 저장 함수 1번 실행
            expect(subscribeRepository.save).toHaveBeenCalledTimes(1);
        });
        it('[Error] 이미 구독취소된 학교 페이지', async () => {
            const userId = 1;
            const schoolId = 1;
            jest.spyOn(subscribeRepository, 'getOneByUnsubscribe').mockResolvedValue(unsubscribeObject);
            try {
                await service.unsubscribeValidator(schoolId, userId);
            } catch (error: any) {
                expect(error.response.resultCode).toEqual(-12011);
                expect(error.response.data).toBe('이미 구독이 취소된 학교페이지 입니다.');
            }
        });
    });
});
