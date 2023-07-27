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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetSubscribeNoticesQueryDto } from './dto/request/getSubscribeNotices.request.dto';
import { ResultSuccessResDto } from '../common/common.response.dto';
import { UnauthorizedAdminUser, UnauthorizedUser } from '../auth/dto/response/error.response.dto';
import { NotfoundSchoolResDto } from '../school/dto/response/error.response.dto';
import { NotfoundNoticeResDto } from './dto/response/error.response.dto';
import { GetSubscribeNoticeResDto } from './dto/response/getSubscribeNotices.response.dto';

@ApiTags('학교 소식')
@Controller('notice')
export class NoticeController {
    constructor(private readonly noticeService: NoticeService) {}

    @Post()
    @UseGuards(AccessTokenGuard, AdminGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '(관리자) 학교 페이지 내에 소식을 작성' })
    @ApiResponse({
        status: 201,
        type: ResultSuccessResDto,
        description: '(관리자) 학교 페이지내 소식 작성 성공',
    })
    @ApiResponse({ status: 401, type: UnauthorizedUser, description: '[Error] 존재하지 않는 계정' })
    @ApiResponse({ status: 402, type: UnauthorizedAdminUser, description: '[Error] 접근할 수 없는 권한' })
    @ApiResponse({
        status: 404,
        type: NotfoundSchoolResDto,
        description: '[Error] 존재하지 않는 학교 페이지',
    })
    async writeNotice(@GetUserId() userId: number, @Body() body: WriteNoticeRequestDto) {
        return await this.noticeService.writeNotice(userId, body);
    }

    @Patch(':noticeId')
    @UseGuards(AccessTokenGuard, AdminGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '(관리자) 학교 페이지 내에 소식을 수정' })
    @ApiResponse({
        status: 201,
        type: ResultSuccessResDto,
        description: '(관리자) 학교 페이지내 소식 수정 성공',
    })
    @ApiResponse({ status: 401, type: UnauthorizedUser, description: '[Error] 존재하지 않는 계정' })
    @ApiResponse({ status: 402, type: UnauthorizedAdminUser, description: '[Error] 접근할 수 없는 권한' })
    @ApiResponse({
        status: 404,
        type: NotfoundNoticeResDto,
        description: '[Error] 존재하지 않는 게시물',
    })
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
    @ApiResponse({
        status: 201,
        type: ResultSuccessResDto,
        description: '(관리자) 학교 페이지내 소식 삭제 성공',
    })
    @ApiResponse({ status: 401, type: UnauthorizedUser, description: '[Error] 존재하지 않는 계정' })
    @ApiResponse({ status: 402, type: UnauthorizedAdminUser, description: '[Error] 접근할 수 없는 권한' })
    @ApiResponse({
        status: 404,
        type: NotfoundNoticeResDto,
        description: '[Error] 존재하지 않는 게시물',
    })
    async deleteNotice(@GetUserId() userId: number, @Param('noticeId') noticeId: number) {
        return await this.noticeService.deleteNotice(userId, noticeId);
    }

    @Get(':schoolId')
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '구독 중인 학교 페이지별 소식(최신순 정렬)' })
    @ApiResponse({
        status: 201,
        type: GetSubscribeNoticeResDto,
        description: '구독 중이 학교 페이지 소식 리스트 성공',
    })
    @ApiResponse({ status: 401, type: UnauthorizedUser, description: '[Error] 존재하지 않는 계정' })
    @ApiResponse({
        status: 404,
        type: NotfoundSchoolResDto,
        description: '[Error] 존재하지 않는 학교 페이지',
    })
    async getSubscribeNotices(
        @GetUserId() userId: number,
        @Param('schoolId', ParseIntPipe) schoolId: number,
        @Query() query: GetSubscribeNoticesQueryDto,
    ) {
        return await this.noticeService.getSubscribeNotices(userId, schoolId, query);
    }
}
