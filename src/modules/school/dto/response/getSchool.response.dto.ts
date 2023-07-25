import { ApiProperty } from '@nestjs/swagger';
import { Location } from 'src/models/School.entity';

export class GetSchoolResData {
    @ApiProperty()
    schoolId: number;

    @ApiProperty({ type: 'enum', enum: Location, default: Location.seoul })
    location: Location;

    @ApiProperty()
    name: string;

    @ApiProperty()
    subscribe: boolean;

    @ApiProperty()
    createdAt: Date;
}

export class GetSchoolResItem {
    @ApiProperty({ type: [GetSchoolResData] })
    items: GetSchoolResData[];

    @ApiProperty()
    count: number;
}

export class GetSchoolResDto {
    @ApiProperty({ default: 1 })
    resultCode: number;

    @ApiProperty({ type: GetSchoolResItem })
    data: GetSchoolResItem;
}
