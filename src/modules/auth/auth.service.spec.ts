import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MockRepositoryType, getMockRepository } from '../../config/mockRepository.config';
import { UserRepository } from '../../repository/user.repository';
import { CryptoService } from '../../libs/crypto/crypto.service';
import { JwtService } from '../../libs/jwt/jwt.service';
import { RoleRepository } from '../../repository/role.repository';
import { GetTokenType } from '../../libs/jwt/types/getToken.type';

describe('AuthService', () => {
    let service: AuthService;
    let cryptoService: CryptoService;
    let jwtService: JwtService;
    let userRepository: MockRepositoryType<UserRepository>;
    let roleRepository: MockRepositoryType<RoleRepository>;

    const userObject = {
        id: 1,
        email: 'ansu1007@naver.com',
        password: '$2b$10$liaDExibnpj5jwRAdeAp5uFHnUEkueqnKW7XNoyxJi9y/RhZX8WCC',
        name: '관리자',
    };
    const roleObject = {
        id: 1,
        name: 'admin',
    };

    const signInObject = {
        accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MDYxOTE1MywiZXhwIjoxNjkwNjIyNzUzfQ.52KR1QTQprBLKlak9JEwbD7kljd36dBFmNRGPcP5AP0',
        refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MDYxOTE1MywiZXhwIjoxNjkwNzA1NTUzfQ.3W_XjLNABQ71MCuqgimrusyQDl5H6tvrg-eud-U9Wjw',
    };
    const hashPassword = '$2b$10$oMvLkUf5uqvAsn/3frA.ZeeJu.Y73KMJUQ2Pj29ErbpAIxtYb9Qsu';

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                CryptoService,
                JwtService,
                {
                    provide: UserRepository,
                    useValue: getMockRepository(UserRepository),
                },
                {
                    provide: RoleRepository,
                    useValue: getMockRepository(RoleRepository),
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        cryptoService = module.get<CryptoService>(CryptoService);
        jwtService = module.get<JwtService>(JwtService);
        userRepository = module.get<UserRepository>(UserRepository);
        roleRepository = module.get<RoleRepository>(RoleRepository);
    });

    describe('회원 생성', () => {
        it('회원 가입 성공', async () => {
            const body = {
                email: 'test@test.com',
                password: '1234',
                name: '유저',
                role: 'user',
            };
            jest.spyOn(service, 'emailValidate').mockResolvedValue();
            jest.spyOn(cryptoService, 'bcryptPassword').mockResolvedValue(hashPassword);
            jest.spyOn(roleRepository, 'findOneByName').mockResolvedValue(roleObject);

            await service.signUp(body);
            // * 저장 함수 1번 실행
            expect(userRepository.create).toHaveBeenCalledTimes(1);
        });
        it('[Error] 이메일 중복', async () => {
            const email = 'test@test.com';

            jest.spyOn(userRepository, 'findOneByEmail').mockResolvedValue(userObject);

            try {
                await service.emailValidate(email);
            } catch (error: any) {
                // * throwError에 대한 처리
                expect(error.response.resultCode).toEqual(-11000);
                expect(error.response.data).toBe('이미 존재하는 계정');
            }
        });
    });

    describe('로그인', () => {
        // it('로그인 성공', async () => {
        //     const body = {
        //         email: 'test@test.com',
        //         password: '1234',
        //     };
        //     jest.spyOn(userRepository, 'findOneByEmail').mockResolvedValue(userObject);
        //     jest.spyOn(service, 'passwordValidate').mockResolvedValue();

        //     expect(jwtService.getToken).toHaveBeenCalledTimes(1);
        //     await service.signIn(body);
        // });
        it('[Error] 존재하지 않는 계정', async () => {
            const email = 'test@test.com';

            jest.spyOn(userRepository, 'findOneByEmail').mockResolvedValue(null);

            try {
                await service.accountValidate(email);
            } catch (error: any) {
                // * throwError에 대한 처리
                expect(error.response.resultCode).toEqual(-10000);
                expect(error.response.data).toBe('존재하지 않는 계정');
            }
        });
        it('[Error] 비밀번호 틀림', async () => {
            const password = '1234';
            const dbPassword = hashPassword;

            jest.spyOn(cryptoService, 'comparePassword').mockResolvedValue(false);
            try {
                await service.passwordValidate(password, dbPassword);
            } catch (error: any) {
                // * throwError에 대한 처리
                expect(error.response.resultCode).toEqual(-11001);
                expect(error.response.data).toBe('비밀번호가 옳바르지 않습니다.');
            }
        });
    });
});
