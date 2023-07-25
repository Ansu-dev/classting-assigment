import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Location } from 'src/models/School.entity';

export class CreateSchoolPageRequestDto {
    @IsString()
    @ApiProperty({ type: 'enum', enum: Location, description: '지역 명' })
    location: Location;

    @IsString()
    @ApiProperty({ description: '학교 명' })
    name: string;
}
