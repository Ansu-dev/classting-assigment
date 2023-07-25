import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SchoolModule } from './school/school.module';
import { NoticeModule } from './notice/notice.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [UserModule, SchoolModule, NoticeModule, AuthModule],
})
export class IndexModule {}
