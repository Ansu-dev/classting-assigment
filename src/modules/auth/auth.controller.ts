import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/request/signUp.request.dto';
import { SignInRequestDto } from './dto/request/signIn.request.dto';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @ApiOperation({ summary: '회원가입' })
    async signUp(@Body() body: SignUpRequestDto) {
        return await this.authService.signUp(body);
    }

    @Post('signin')
    @ApiOperation({ summary: '로그인' })
    async signIn(@Body() body: SignInRequestDto) {
        return await this.authService.signIn(body);
    }
}
