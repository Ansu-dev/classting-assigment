import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoticeRequestDto {
    @ApiProperty({ required: false })
    title?: string;

    @ApiProperty({ required: false })
    content?: string;
}
