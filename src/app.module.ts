import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { IndexModule } from './modules/index.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
        }),
        IndexModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
