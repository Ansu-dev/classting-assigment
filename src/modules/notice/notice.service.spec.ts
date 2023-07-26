import { Test, TestingModule } from '@nestjs/testing';
import { NoticeService } from './notice.service';
import { SchoolRepository } from '../../repository/school.repository';
import { UserRepository } from '../../repository/user.repository';
import { SubscribeRepository } from '../../repository/subscribe.repository';
import { NoticeRepository } from '../../repository/notice.repository';
import { Location } from '../../models/School.entity';

export const getMockRepository = (targetRepository) => {
    let mockRepository = {};

    Object.getOwnPropertyNames(targetRepository.prototype)
        .filter((key: string) => key !== 'constructor')
        .forEach((key: string) => {
            mockRepository[key] = jest.fn();
        });

    return mockRepository;
};

export type MockRepositoryType<T> = Partial<Record<keyof T, jest.Mock>> | Partial<T>;

describe('NoticeService', () => {
    let service: NoticeService;
    let noticeRepository: MockRepositoryType<NoticeRepository>;
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

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                NoticeService,
                {
                    provide: NoticeRepository,
                    useValue: getMockRepository(NoticeRepository),
                },
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

        service = module.get<NoticeService>(NoticeService);
        noticeRepository = module.get<NoticeRepository>(NoticeRepository);
        schoolRepository = module.get<SchoolRepository>(SchoolRepository);
        userRepository = module.get<UserRepository>(UserRepository);
        subscribeRepository = module.get<SubscribeRepository>(SubscribeRepository);
    });

    describe('학교 페이지 소식 작성', () => {
        it('작성 성공', async () => {
            const userId = 1;
            const body = {
                title: '소식 제목',
                content: '소식 내용',
                schoolId: 1,
            };
            // * 유저 검증을 통과 가정
            jest.spyOn(userRepository, 'findOneById').mockResolvedValue(userObject);

            // * 학교 페이지 검증을 통과 가정
            jest.spyOn(schoolRepository, 'findOneBySchoolId').mockResolvedValue(schoolObject);

            // * validate 통과 가정
            jest.spyOn(service, 'schoolPageValidate').mockResolvedValue();

            await service.writeNotice(userId, body);

            // * 저장 함수 1번 실행
            expect(noticeRepository.create).toHaveBeenCalledTimes(1);
        });
        it('[Error] 접근할수 없는 학교 페이지', async () => {
            const userId = 1;
            const schoolId = 1;

            try {
                await service.schoolPageValidate(userId, schoolId);
                jest.spyOn(schoolRepository, 'findOneBySchooIdAndUserId').mockResolvedValue(null);
            } catch (error: any) {
                // * throwError에 대한 처리
                expect(error.response.resultCode).toEqual(-10002);
                expect(error.response.data).toBe('접근할수 없는 학교 페이지');
            }
        });
    });
    describe('학교 페이지 소식 수정', () => {});
    describe('학교 페이지 소식 삭제', () => {});
});
