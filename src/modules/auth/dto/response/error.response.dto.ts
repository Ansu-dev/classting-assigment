import { ApiProperty } from '@nestjs/swagger';
import { ErrorMessage } from '../../../../config/errorMessage.config';

export class UnauthorizedUser {
    @ApiProperty({ default: ErrorMessage[10000].resultCode })
    resultCode: number;

    @ApiProperty({ default: ErrorMessage[10000].data })
    data: string;
}

export class UnauthorizedAdminUser {
    @ApiProperty({ default: ErrorMessage[10001].resultCode })
    resultCode: number;

    @ApiProperty({ default: ErrorMessage[10001].data })
    data: string;
}

export class ExistUserEmailResDto {
    @ApiProperty({ default: ErrorMessage[11000].resultCode })
    resultCode: number;

    @ApiProperty({ default: ErrorMessage[11000].data })
    data: string;
}

export class NotfoundRoleResDto {
    @ApiProperty({ default: ErrorMessage[10001].resultCode })
    resultCode: number;

    @ApiProperty({ default: ErrorMessage[10001].data })
    data: string;
}

export class InvalidPassword {
    @ApiProperty({ default: ErrorMessage[11001].resultCode })
    resultCode: number;

    @ApiProperty({ default: ErrorMessage[11001].data })
    data: string;
}
