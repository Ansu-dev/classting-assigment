import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME,
            entities: ['dist/**/*.entity.{ts,js}'],
            synchronize: process.env.DB_SYNC ? JSON.parse(process.env.DB_SYNC) : false,
        };
    }
}
