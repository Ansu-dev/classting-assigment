import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsString } from 'class-validator';

export class SignUpRequestDto {
    @IsEmail()
    @ApiProperty({ format: 'email' })
    email: string;

    @IsEmpty()
    @IsString()
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    role: string;
}
