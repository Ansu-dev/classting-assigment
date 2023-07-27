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

export class GetSubscribeNoticeItem {
    @ApiProperty({ type: [GetSubscribeNoticesData] })
    items: GetSubscribeNoticesData[];

    @ApiProperty()
    count: number;
}

export class GetSubscribeNoticeResDto {
    @ApiProperty({ default: 1 })
    resultCode: number;

    @ApiProperty({ type: GetSubscribeNoticeItem })
    data: GetSubscribeNoticeItem;
}
