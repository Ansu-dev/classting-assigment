import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { ShoolController } from './school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/User.entity';
import { School } from '../../models/School.entity';
import { Subscribe } from '../../models/Subscribe.entity';
import { SchoolRepository } from '../../repository/school.repository';
import { UserRepository } from '../../repository/user.repository';
import { SubscribeRepository } from '../../repository/subscribe.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User, School, Subscribe])],
    providers: [SchoolService, SchoolRepository, UserRepository, SubscribeRepository],
    controllers: [ShoolController],
})
export class SchoolModule {}
