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
