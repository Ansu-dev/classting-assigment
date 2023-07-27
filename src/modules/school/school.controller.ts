import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { SchoolService } from './school.service';
import { AccessTokenGuard } from 'src/guard/guard/accessToken.guard';
import { AdminGuard } from 'src/guard/guard/admin.guard';
import { GetUserId } from 'src/decorator/getUser.decorator';
import { CreateSchoolPageRequestDto } from './dto/request/create.request.dto';
import { GetSchoolsQueryDto } from './dto/request/getSchool.query.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('학교 페이지')
@Controller('school')
export class ShoolController {
    constructor(private readonly schoolService: SchoolService) {}

    @Post()
    @UseGuards(AccessTokenGuard, AdminGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '(관리자) 학교 페이지 생성' })
    async create(@GetUserId() userId: number, @Body() body: CreateSchoolPageRequestDto) {
        return await this.schoolService.create(userId, body);
    }

    // TODO : 구독중인 학교 페이지 목록(수정 필요)
    @Get()
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '구독 중인 학교 페이지 목록' })
    async getSchool(@GetUserId() userId: number, @Query() query: GetSchoolsQueryDto) {
        return await this.schoolService.getSchools(userId, query);
    }

    @Post('subscribe/:schoolId')
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '구독 중인 학교 페이지 구독' })
    async subscribeSchool(@Param('schoolId', ParseIntPipe) schoolId: number, @GetUserId() userId: number) {
        return await this.schoolService.subscribeSchool(schoolId, userId);
    }

    @Delete('unsubscribe/:schoolId')
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('authorization')
    @ApiOperation({ summary: '구독 중인 학교 페이지 구독 취소' })
    async unsubscribeSchool(
        @Param('schoolId', ParseIntPipe) schoolId: number,
        @GetUserId() userId: number,
    ) {
        return await this.schoolService.unsubscibeSchool(schoolId, userId);
    }
}
