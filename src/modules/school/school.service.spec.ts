import { Test, TestingModule } from '@nestjs/testing';
import { SchoolService } from './school.service';
import { SchoolRepository } from '../../repository/school.repository';
import { UserRepository } from '../../repository/user.repository';
import { Location } from '../../models/School.entity';

// * mock repository 객체를 반복문으로 한번에 생성하기 위한 함수
// * ㅇ
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
            ],
        }).compile();

        service = module.get<SchoolService>(SchoolService);
        schoolRepository = module.get<SchoolRepository>(SchoolRepository);
        userRepository = module.get<UserRepository>(UserRepository);
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

            try {
                await service.create(userId, body);
            } catch (error: any) {}
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
                expect(error.response.resultCode).toEqual(-11000);
                expect(error.response.data).toBe('이미 존재하는 학교페이지 입니다.');
            }
        });
    });
});
