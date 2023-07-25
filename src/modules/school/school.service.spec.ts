import { Test, TestingModule } from '@nestjs/testing';
import { SchoolService } from './school.service';
import { SchoolRepository } from '../../repository/school.repository';
import { UserRepository } from '../../repository/user.repository';
import { Location } from '../../models/School.entity';
import { SubscribeRepository } from '../../repository/subscribe.repository';

// * mock repository 객체를 반복문으로 한번에 생성하기 위한 함수
// * mockRepository의 함수를 모두 명시해줄수 없기때문에 기존에 있는 함수를 Mock 함수로 사용
export const getMockRepository = (targetRepository) => {
    let mockRepository = {};

    Object.getOwnPropertyNames(targetRepository.prototype)
        .filter((key: string) => key !== 'constructor')
        .forEach((key: string) => {
            mockRepository[key] = jest.fn();
        });

    return mockRepository;
};

// * mock repository용 타입 애너테이션
export type MockRepositoryType<T> = Partial<Record<keyof T, jest.Mock>> | Partial<T>;

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

    describe('구독 생성', () => {
        it('구독 완료', async () => {
            const userId = 1;
            const schoolId = 1;
            // * 유저 검증을 통과 가정
            jest.spyOn(userRepository, 'findOneById').mockResolvedValue(userObject);

            // * 학교 페이지 검증을 통과 가정
            jest.spyOn(schoolRepository, 'findOneBySchoolId').mockResolvedValue(schoolObject);

            await service.subscribeSchool(schoolId, userId);

            // * 저장 함수 1번 실행
            expect(subscribeRepository.create).toHaveBeenCalledTimes(1);
        });
        it('[Error] 이미 구독이된 학교 페이지', async () => {
            const userId = 1;
            const schoolId = 1;
            jest.spyOn(subscribeRepository, 'findOneByUserIdAndSchoolId').mockResolvedValue(
                subscribeObject,
            );
            try {
                await service.subscribeValidator(schoolId, userId);
            } catch (error: any) {
                expect(error.response.resultCode).toEqual(-12010);
                expect(error.response.data).toBe('이미 구독된 학교페이지 입니다.');
            }
        });
    });
});
