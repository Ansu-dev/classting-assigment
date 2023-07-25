import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CryptoService } from 'src/libs/crypto/crypto.service';
import { UserRepository } from 'src/repository/user.repository';
import { JwtService } from 'src/libs/jwt/jwt.service';
import { User } from 'src/models/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/models/Role.entity';
import { RoleRepository } from 'src/repository/role.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    controllers: [AuthController],
    providers: [AuthService, UserRepository, RoleRepository, JwtService, CryptoService],
})
export class AuthModule {}
