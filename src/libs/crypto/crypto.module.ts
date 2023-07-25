import { DynamicModule, Global, Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Global()
@Module({})
export class CryptoModule {
    static forRoot(): DynamicModule {
        return {
            module: CryptoModule,
            providers: [CryptoService],
            exports: [CryptoService],
        };
    }
}
