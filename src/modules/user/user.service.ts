import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from 'src/libs/jwt/jwt.service';
import { UserRepository } from 'src/repository/user.repository';
import { SignUpRequestDto } from './dto/request/signUp.request.dto';
import { SignInRequestDto } from './dto/request/signIn.request.dto';
import { CryptoService } from 'src/libs/crypto/crypto.service';

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly cryptoService: CryptoService,
        private readonly userRepository: UserRepository,
    ) {}

    // * 임시 생성용
    async signUp(body: SignUpRequestDto) {
        const { email, password, name } = body;
        const hashPassword = await this.cryptoService.bcryptPassword(password);
        const user = this.userRepository.create();
        user.email = email;
        user.password = hashPassword;
        user.name = name;
        await this.userRepository.save(user);
        return { resultCode: 1, data: null };
    }

    // * 임시 인증용 로그인
    async signIn(body: SignInRequestDto) {
        const user = await this.userRepository.getOneBySignIn(body);
        if (!user) {
            throw new UnauthorizedException({
                message: '이메일 또는 비밀번호가 일치하지 않습니다.',
            });
        }
        const userId = user.id;
        const { accessToken, refreshToken } = this.jwtService.getToken(userId);
        return { resultCode: 1, data: { accessToken, refreshToken } };
    }
}
