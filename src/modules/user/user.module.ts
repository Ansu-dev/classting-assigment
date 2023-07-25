import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/User.entity';
import { UserRepository } from 'src/repository/user.repository';
import { JwtService } from 'src/libs/jwt/jwt.service';
import { CryptoService } from 'src/libs/crypto/crypto.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, UserRepository, JwtService, CryptoService],
    controllers: [UserController],
})
export class UserModule {}
