import { Injectable } from '@nestjs/common';
import { throwError } from '../../config/errorMessage.config';
import { JwtService } from '../../libs/jwt/jwt.service';
import { CryptoService } from '../../libs/crypto/crypto.service';
import { UserRepository } from '../../repository/user.repository';
import { RoleRepository } from '../../repository/role.repository';
import { SignUpRequestDto } from './dto/request/signUp.request.dto';
import { SignInRequestDto } from './dto/request/signIn.request.dto';
import { CreateType } from './dto/types/create.type';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly cryptoService: CryptoService,
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository,
    ) {}
    // * 임시 생성용
    async signUp(body: SignUpRequestDto) {
        const { email, password, name, role } = body;
        // * 이메일 중복 검증
        await this.emailValidate(email);

        // * 권한 부여
        const getRole = await this.roleRepository.findOneByName(role);
        if (!getRole) {
            return throwError(404, 10001);
        }

        const hashPassword = await this.cryptoService.bcryptPassword(password);
        const createData: CreateType = {
            email: email,
            password: hashPassword,
            name: name,
            role: getRole,
        };
        // * 유저 생성
        await this.userRepository.create(createData);

        return { resultCode: 1, data: null };
    }

    // * 임시 인증용 로그인
    async signIn(body: SignInRequestDto) {
        const { email, password } = body;

        // * 계정 검증
        await this.accountValidate(email);

        // * 해당 user를 이전에 검증을 통과한 상태
        const user = await this.userRepository.findOneByEmail(email);

        // * 비밀번호 검증
        const dbPassword = user?.password ?? '';
        await this.passwordValidate(password, dbPassword);

        const userId = user?.id ?? 0;
        const { accessToken, refreshToken } = this.jwtService.getToken(userId);
        return { resultCode: 1, data: { accessToken, refreshToken } };
    }

    async emailValidate(email: string): Promise<void> {
        const user = await this.userRepository.findOneByEmail(email);
        if (user) {
            return throwError(400, 11000);
        }
    }

    async accountValidate(email: string): Promise<void> {
        const user = await this.userRepository.findOneByEmail(email);
        if (!user) {
            // * 존재하지 않는 계정
            return throwError(401, 10000);
        }
    }

    async passwordValidate(password: string, dbPassword: string): Promise<void> {
        const result = await this.cryptoService.comparePassword(password, dbPassword);
        if (!result) {
            return throwError(400, 11001);
        }
    }
}
