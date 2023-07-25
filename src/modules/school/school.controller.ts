import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { SchoolService } from './school.service';
import { AccessTokenGuard } from 'src/guard/guard/accessToken.guard';
import { AdminGuard } from 'src/guard/guard/admin.guard';
import { GetUserId } from 'src/decorator/getUser.decorator';
import { CreateSchoolPageRequestDto } from './dto/request/create.request.dto';
import { GetSchoolsQueryDto } from './dto/request/getSchool.query.dto';

@Controller('school')
export class ShoolController {
    constructor(private readonly schoolService: SchoolService) {}

    @Post()
    @UseGuards(AccessTokenGuard, AdminGuard)
    async create(@GetUserId() userId: number, @Body() body: CreateSchoolPageRequestDto) {
        return await this.schoolService.create(userId, body);
    }

    // TODO : 미들웨어로 토큰 유무 판별 해야함
    @Get()
    @UseGuards(AccessTokenGuard)
    async getSchool(@GetUserId() userId: number, @Query() query: GetSchoolsQueryDto) {
        return await this.schoolService.getSchools(userId, query);
    }

    @Post('subscribe/:schoolId')
    @UseGuards(AccessTokenGuard)
    async subscribeSchool(@Param('schoolId', ParseIntPipe) schoolId: number, @GetUserId() userId: number) {
        return await this.schoolService.subscribeSchool(schoolId, userId);
    }

    @Delete('unsubscribe/:schoolId')
    @UseGuards(AccessTokenGuard)
    async unsubscribeSchool(
        @Param('schoolId', ParseIntPipe) schoolId: number,
        @GetUserId() userId: number,
    ) {
        return await this.schoolService.unsubscibeSchool(schoolId, userId);
    }
}
