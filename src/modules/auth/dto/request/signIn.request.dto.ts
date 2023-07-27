import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInRequestDto {
    @IsEmail()
    @IsString()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;
}
