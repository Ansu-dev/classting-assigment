import { Injectable, Logger, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { method, url } = request;

        const now = Date.now();

        return next.handle().pipe(
            tap(() => {
                const elapsedTime = Date.now() - now;
                this.logger.log(`${method} ${url} - ${elapsedTime}ms`);
            }),
        );
    }
}
