import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/User.entity';
import { UserRepository } from '../../repository/user.repository';
import { JwtService } from '../../libs/jwt/jwt.service';
import { CryptoService } from '../../libs/crypto/crypto.service';
import { SubscribeRepository } from '../../repository/subscribe.repository';
import { Subscribe } from '../../models/Subscribe.entity';
import { NoticeRepository } from '../../repository/notice.repository';
import { Notice } from '../../models/Notice.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Subscribe, Notice])],
    providers: [
        UserService,
        JwtService,
        CryptoService,
        UserRepository,
        SubscribeRepository,
        NoticeRepository,
    ],
    controllers: [UserController],
})
export class UserModule {}
