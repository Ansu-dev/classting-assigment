import { ApiProperty } from '@nestjs/swagger';
import { ErrorMessage } from '../../../../config/errorMessage.config';

export class UnauthorizedUser {
    @ApiProperty({ default: ErrorMessage[10000].resultCode })
    resultCode: number;

    @ApiProperty({ default: ErrorMessage[10000].data })
    data: string;
}
