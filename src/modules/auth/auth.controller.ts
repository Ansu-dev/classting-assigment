import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/request/signUp.request.dto';
import { SignInRequestDto } from './dto/request/signIn.request.dto';
import { ResultSuccessResDto } from '../common/common.response.dto';
import {
    ExistUserEmailResDto,
    InvalidPassword,
    NotfoundRoleResDto,
    UnauthorizedUser,
} from './dto/response/error.response.dto';
import { SignInResDto } from './dto/response/signIn.response.dto';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @ApiOperation({ summary: '회원가입' })
    @ApiResponse({
        status: 201,
        type: ResultSuccessResDto,
        description: '유저 회원가입 성공',
    })
    @ApiResponse({ status: 400, type: ExistUserEmailResDto, description: '[Error] 이미 존재하는 이메일' })
    @ApiResponse({ status: 404, type: NotfoundRoleResDto, description: '[Error] 존재하지 않는 권한' })
    async signUp(@Body() body: SignUpRequestDto) {
        return await this.authService.signUp(body);
    }

    @Post('signin')
    @ApiOperation({ summary: '로그인' })
    @ApiResponse({
        status: 201,
        type: SignInResDto,
        description: '유저 로그인 성공',
    })
    @ApiResponse({ status: 401, type: UnauthorizedUser, description: '[Error] 존재하지 않는 계정' })
    @ApiResponse({ status: 400, type: InvalidPassword, description: '[Error] 옳바르지 않는 비밀번호' })
    async signIn(@Body() body: SignInRequestDto) {
        return await this.authService.signIn(body);
    }
}
