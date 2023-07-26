import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { AccessTokenGuard } from '../../guard/guard/accessToken.guard';
import { AdminGuard } from '../../guard/guard/admin.guard';
import { GetUserId } from 'src/decorator/getUser.decorator';
import { WriteNoticeRequestDto } from './dto/request/writeNotice.request.dto';

@Controller('notice')
export class NoticeController {
    constructor(private readonly noticeService: NoticeService) {}

    @Post()
    @UseGuards(AccessTokenGuard, AdminGuard)
    async writeNotice(@GetUserId() userId: number, @Body() body: WriteNoticeRequestDto) {
        return await this.noticeService.writeNotice(userId, body);
    }
}
