import { ApiProperty } from '@nestjs/swagger';

export class GetSubscribeNoticesData {
    @ApiProperty()
    noticeId: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    createdAt: Date;
}
