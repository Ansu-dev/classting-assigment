import { ApiProperty } from '@nestjs/swagger';
import { ErrorMessage } from 'src/config/errorMessage.config';

export class NotfoundSchoolResDto {
    @ApiProperty({ default: ErrorMessage[12001].resultCode })
    resultCode: number;

    @ApiProperty({ default: ErrorMessage[12001].data })
    data: string;
}

export class ForbidenSubscriptionResDto {
    @ApiProperty({ default: ErrorMessage[12012].resultCode })
    resultCode: number;

    @ApiProperty({ default: ErrorMessage[12012].data })
    data: string;
}
