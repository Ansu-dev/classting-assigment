import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ShoolModule } from './shool/shool.module';
import { NoticeModule } from './notice/notice.module';

@Module({
    imports: [UserModule, ShoolModule, NoticeModule],
})
export class IndexModule {}
