import { ApiProperty } from '@nestjs/swagger';

export class SignInData {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;
}

export class SignInResDto {
    @ApiProperty({ default: 1 })
    resultCode: number;

    @ApiProperty({ type: SignInData })
    data: SignInData;
}
