import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenGuard } from '../../guard/guard/accessToken.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetUserId } from 'src/decorator/getUser.decorator';
import { GetSubscribeNoticeQueryDto } from './dto/request/getSubscribeNotice.query.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('subcribe/notice')
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '구독 중인 학교 페이지 목록' })
    async getSubscribeNotices(@GetUserId() userId: number, @Query() query: GetSubscribeNoticeQueryDto) {
        return await this.userService.getSubscribeNotices(userId, query);
    }
}
