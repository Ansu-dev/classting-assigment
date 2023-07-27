import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../../../../models/School.entity';

export class GetSubscribeNoticeData {
    @ApiProperty()
    noticeId: number;

    @ApiProperty({ type: Location })
    location: Location;

    @ApiProperty()
    name: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;

    @ApiProperty({ description: '소식 등록 날짜' })
    createdAt: Date;
}

export class GetSubscribeNoticeItem {
    @ApiProperty({ type: [GetSubscribeNoticeData] })
    items: GetSubscribeNoticeData[];

    @ApiProperty()
    count: number;
}

export class GetSubscribeNoticeResDto {
    @ApiProperty({ default: 1 })
    resultCode: number;

    @ApiProperty({ type: GetSubscribeNoticeItem })
    data: GetSubscribeNoticeItem;
}
