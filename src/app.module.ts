import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IndexModule } from './modules/index.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from './typeorm/typeorm.service';
import { AccessTokenStrategy } from './guard/strategy/accessToken.strategy';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
        }),
        IndexModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TypeormService,
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService, AccessTokenStrategy],
})
export class AppModule {}
