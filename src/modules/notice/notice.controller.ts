import { Body, Controller, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { AccessTokenGuard } from '../../guard/guard/accessToken.guard';
import { AdminGuard } from '../../guard/guard/admin.guard';
import { GetUserId } from 'src/decorator/getUser.decorator';
import { WriteNoticeRequestDto } from './dto/request/writeNotice.request.dto';
import { UpdateNoticeRequestDto } from './dto/request/updateNotice.request.dto';

@Controller('notice')
export class NoticeController {
    constructor(private readonly noticeService: NoticeService) {}

    @Post()
    @UseGuards(AccessTokenGuard, AdminGuard)
    async writeNotice(@GetUserId() userId: number, @Body() body: WriteNoticeRequestDto) {
        return await this.noticeService.writeNotice(userId, body);
    }

    @Patch(':noticeId')
    @UseGuards(AccessTokenGuard, AdminGuard)
    async updateNotice(
        @GetUserId() userId: number,
        @Param('noticeId', ParseIntPipe) noticeId: number,
        @Body() body: UpdateNoticeRequestDto,
    ) {
        return await this.noticeService.updateNotice(userId, noticeId, body);
    }
}
