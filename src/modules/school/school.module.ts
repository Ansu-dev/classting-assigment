import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { ShoolController } from './school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/User.entity';
import { School } from 'src/models/School.entity';
import { Subscribe } from 'src/models/Subscribe.entity';
import { SchoolRepository } from 'src/repository/school.repository';
import { UserRepository } from 'src/repository/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User, School, Subscribe])],
    providers: [SchoolService, SchoolRepository, UserRepository],
    controllers: [ShoolController],
})
export class SchoolModule {}
