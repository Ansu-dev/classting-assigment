import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/User.entity';
import { School } from '../../models/School.entity';
import { Subscribe } from '../../models/Subscribe.entity';
import { Notice } from '../../models/Notice.entity';
import { NoticeRepository } from '../../repository/notice.repository';
import { UserRepository } from '../../repository/user.repository';
import { SchoolRepository } from '../../repository/school.repository';
import { SubscribeRepository } from '../../repository/subscribe.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User, School, Subscribe, Notice])],
    providers: [NoticeService, NoticeRepository, UserRepository, SchoolRepository, SubscribeRepository],
    controllers: [NoticeController],
})
export class NoticeModule {}
