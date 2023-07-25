import { Module } from '@nestjs/common';
import { ShoolService } from './shool.service';
import { ShoolController } from './shool.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/User.entity';
import { School } from 'src/models/School.entity';
import { Subscribe } from 'src/models/Subscribe.entity';
import { SchoolRepository } from 'src/repository/school.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User, School, Subscribe])],
    providers: [ShoolService, SchoolRepository],
    controllers: [ShoolController],
})
export class ShoolModule {}
