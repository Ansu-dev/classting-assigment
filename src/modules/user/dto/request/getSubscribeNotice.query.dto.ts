import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetSubscribeNoticeQueryDto {
    @IsNumber()
    @ApiProperty()
    page: number;

    @IsNumber()
    @ApiProperty()
    perPage: number;
}
