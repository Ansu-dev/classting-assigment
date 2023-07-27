import { ApiProperty } from '@nestjs/swagger';
import { ErrorMessage } from 'src/config/errorMessage.config';

export class NotfoundNoticeResDto {
    @ApiProperty({ default: ErrorMessage[12020].resultCode })
    resultCode: number;

    @ApiProperty({ default: ErrorMessage[12020].data })
    data: string;
}
