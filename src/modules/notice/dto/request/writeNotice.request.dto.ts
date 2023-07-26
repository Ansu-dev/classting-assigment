import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNumber, IsString } from 'class-validator';

export class WriteNoticeRequestDto {
    @IsEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsEmpty()
    @IsString()
    @ApiProperty()
    content: string;

    @IsEmpty()
    @IsNumber()
    @ApiProperty()
    schoolId: number;
}
