import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenGuard } from '../../guard/guard/accessToken.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserId } from 'src/decorator/getUser.decorator';
import { GetSubscribeNoticeQueryDto } from './dto/request/getSubscribeNotice.query.dto';
import { GetSubscribeNoticeResDto } from './dto/response/getSubscribeNotice.response.dto';
import { UnauthorizedUser } from '../auth/dto/response/error.response.dto';

@ApiTags('소식 모아보기')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('subcribe/notice')
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '구독 중인 학교 페이지 소식 모아보기' })
    @ApiResponse({
        status: 201,
        type: GetSubscribeNoticeResDto,
        description: '구독 중인 학교페이지 소식 모아보기 성공',
    })
    @ApiResponse({ status: 401, type: UnauthorizedUser, description: '[Error] 존재하지 않는 계정' })
    async getSubscribeNotices(@GetUserId() userId: number, @Query() query: GetSubscribeNoticeQueryDto) {
        return await this.userService.getSubscribeNotices(userId, query);
    }
}
