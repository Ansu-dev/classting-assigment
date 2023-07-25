import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetSchoolsQueryDto {
    @IsNumber()
    @ApiProperty()
    page: number;

    @IsNumber()
    @ApiProperty()
    perPage: number;

    @ApiProperty({ description: '검색어 지역 or 학교 명', required: false })
    search?: string;
}
