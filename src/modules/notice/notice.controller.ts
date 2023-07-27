import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { AccessTokenGuard } from '../../guard/guard/accessToken.guard';
import { AdminGuard } from '../../guard/guard/admin.guard';
import { GetUserId } from 'src/decorator/getUser.decorator';
import { WriteNoticeRequestDto } from './dto/request/writeNotice.request.dto';
import { UpdateNoticeRequestDto } from './dto/request/updateNotice.request.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetSubscribeNoticesQueryDto } from './dto/request/getSubscribeNotices.request.dto';

@ApiTags('학교 소식')
@Controller('notice')
export class NoticeController {
    constructor(private readonly noticeService: NoticeService) {}

    @Post()
    @UseGuards(AccessTokenGuard, AdminGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '(관리자) 학교 페이지 내에 소식을 작성' })
    async writeNotice(@GetUserId() userId: number, @Body() body: WriteNoticeRequestDto) {
        return await this.noticeService.writeNotice(userId, body);
    }

    @Patch(':noticeId')
    @UseGuards(AccessTokenGuard, AdminGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '(관리자) 학교 페이지 내에 소식을 수정' })
    async updateNotice(
        @GetUserId() userId: number,
        @Param('noticeId', ParseIntPipe) noticeId: number,
        @Body() body: UpdateNoticeRequestDto,
    ) {
        return await this.noticeService.updateNotice(userId, noticeId, body);
    }

    @Delete(':noticeId')
    @UseGuards(AccessTokenGuard, AdminGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '(관리자) 학교 페이지 내에 소식을 삭제' })
    async deleteNotice(@GetUserId() userId: number, @Param('noticeId') noticeId: number) {
        return await this.noticeService.deleteNotice(userId, noticeId);
    }

    @Get(':schoolId')
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '구독 중인 학교 페이지별 소식(최신순 정렬)' })
    async getSubscribeNotices(
        @GetUserId() userId: number,
        @Param('schoolId', ParseIntPipe) schoolId: number,
        @Query() query: GetSubscribeNoticesQueryDto,
    ) {}
}
