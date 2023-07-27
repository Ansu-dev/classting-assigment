import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { SchoolService } from './school.service';
import { AccessTokenGuard } from 'src/guard/guard/accessToken.guard';
import { AdminGuard } from 'src/guard/guard/admin.guard';
import { GetUserId } from 'src/decorator/getUser.decorator';
import { CreateSchoolPageRequestDto } from './dto/request/create.request.dto';
import { GetSchoolsQueryDto } from './dto/request/getSchool.query.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResultSuccessResDto } from '../common/common.response.dto';
import { UnauthorizedAdminUser, UnauthorizedUser } from '../auth/dto/response/error.response.dto';
import { GetSchoolResDto } from './dto/response/getSchool.response.dto';
import { ForbidenSubscriptionResDto, NotfoundSchoolResDto } from './dto/response/error.response.dto';

@ApiTags('학교 페이지')
@Controller('school')
export class ShoolController {
    constructor(private readonly schoolService: SchoolService) {}

    @Post()
    @UseGuards(AccessTokenGuard, AdminGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '(관리자) 학교 페이지 생성' })
    @ApiResponse({ status: 200, type: ResultSuccessResDto, description: '(관리자) 학교 페이지 생성 성공' })
    @ApiResponse({ status: 401, type: UnauthorizedUser, description: '[Error] 존재하지 않는 계정' })
    @ApiResponse({ status: 402, type: UnauthorizedAdminUser, description: '[Error] 접근할 수 없는 권한' })
    async create(@GetUserId() userId: number, @Body() body: CreateSchoolPageRequestDto) {
        return await this.schoolService.create(userId, body);
    }

    @Get()
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '구독 중인 학교 페이지 목록' })
    @ApiResponse({ status: 200, type: GetSchoolResDto, description: '구독 중인 학교 페이지 목록 성공' })
    @ApiResponse({ status: 401, type: UnauthorizedUser, description: '[Error] 존재하지 않는 계정' })
    async getSubscribeSchool(@GetUserId() userId: number, @Query() query: GetSchoolsQueryDto) {
        return await this.schoolService.getSubscribeSchool(userId, query);
    }

    @Post('subscribe/:schoolId')
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '구독 중인 학교 페이지 구독' })
    @ApiResponse({ status: 200, type: ResultSuccessResDto, description: '학교 페이지 구독 성공' })
    @ApiResponse({ status: 401, type: UnauthorizedUser, description: '[Error] 존재하지 않는 계정' })
    @ApiResponse({
        status: 404,
        type: NotfoundSchoolResDto,
        description: '[Error] 존재하지 않는 학교 페이지',
    })
    async subscribeSchool(@Param('schoolId', ParseIntPipe) schoolId: number, @GetUserId() userId: number) {
        return await this.schoolService.subscribeSchool(schoolId, userId);
    }

    @Delete('unsubscribe/:schoolId')
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '구독 중인 학교 페이지 구독 취소' })
    @ApiResponse({ status: 200, type: ResultSuccessResDto, description: '학교 페이지 구독 취소 성공' })
    @ApiResponse({ status: 401, type: UnauthorizedUser, description: '[Error] 존재하지 않는 계정' })
    @ApiResponse({
        status: 403,
        type: ForbidenSubscriptionResDto,
        description: '[Error] 존재하지 않는 구독',
    })
    @ApiResponse({
        status: 404,
        type: NotfoundSchoolResDto,
        description: '[Error] 존재하지 않는 학교 페이지',
    })
    async unsubscribeSchool(
        @Param('schoolId', ParseIntPipe) schoolId: number,
        @GetUserId() userId: number,
    ) {
        return await this.schoolService.unsubscibeSchool(schoolId, userId);
    }
}
