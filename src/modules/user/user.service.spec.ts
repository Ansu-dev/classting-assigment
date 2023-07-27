import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MockRepositoryType, getMockRepository } from '../../config/mockRepository.config';
import { UserRepository } from '../../repository/user.repository';

describe('UserService', () => {
    let service: UserService;
    let userRepository: MockRepositoryType<UserRepository>;

    const userObject = {
        id: 1,
        email: 'ansu1007@naver.com',
        password: '$2b$10$liaDExibnpj5jwRAdeAp5uFHnUEkueqnKW7XNoyxJi9y/RhZX8WCC',
        name: '관리자',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserRepository,
                    useValue: getMockRepository(UserRepository),
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    describe('구독 학교 소식 모아보기', () => {
        it('[Error] 존재하지 않는 유저', async () => {});
    });
});
