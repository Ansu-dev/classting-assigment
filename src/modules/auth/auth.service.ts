import { Injectable } from '@nestjs/common';
import { throwError } from 'src/config/errorMessage.config';
import { JwtService } from 'src/libs/jwt/jwt.service';
import { CryptoService } from 'src/libs/crypto/crypto.service';
import { UserRepository } from 'src/repository/user.repository';
import { RoleRepository } from 'src/repository/role.repository';
import { SignUpRequestDto } from './dto/request/signUp.request.dto';
import { SignInRequestDto } from './dto/request/signIn.request.dto';

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
        const { email, password, name } = body;
        // TODO : 이메일 중복 검증(test code 작성)
        // TODO : 비밀번호 정규식
        const hashPassword = await this.cryptoService.bcryptPassword(password);
        const user = this.userRepository.create();
        user.email = email;
        user.password = hashPassword;
        user.name = name;

        // * 권한 부여
        const role = await this.roleRepository.findOneByName('user');
        if (!role) {
            return throwError(400, 9999);
        }
        user.role = role;
        await this.userRepository.save(user);
        return { resultCode: 1, data: null };
    }

    // * 임시 인증용 로그인
    async signIn(body: SignInRequestDto) {
        const { email, password } = body;
        // TODO : 유저 검증 (test code 작성)
        const user = await this.userRepository.findOneByEmail(email);
        if (!user) {
            // * 존재하지 않는 계정
            return throwError(401, 10000);
        }

        // TODO : 비밀번호 검증(test code 작성)
        const result = await this.cryptoService.comparePassword(password, user.password);
        if (!result) {
            return throwError(400, 11000);
        }

        const userId = user.id;
        const { accessToken, refreshToken } = this.jwtService.getToken(userId);
        return { resultCode: 1, data: { accessToken, refreshToken } };
    }
}
