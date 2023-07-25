import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../repository/user.repository';
import { User } from 'src/models/User.entity';
import { AccessTokenStrategy } from 'src/guard/strategy/accessToken.strategy';

@Global()
@Module({})
export class JwtModule {
    static forRoot(): DynamicModule {
        return {
            module: JwtModule,
            imports: [TypeOrmModule.forFeature([User])],
            providers: [JwtService, AccessTokenStrategy, UserRepository],
            exports: [JwtService],
        };
    }
}
