import { CallHandler, ExecutionContext, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
import { CustomJwtPayload } from '../guard/strategy/accessToken.strategy';

export class JwtInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization'];

        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            const token = authorizationHeader.substring(7); // 'Bearer ' 부분을 제거하고 토큰만 추출

            const jwtSecret = process.env.JWT_SECRET_KEY;
            verify(token, jwtSecret, (_, user: CustomJwtPayload) => {
                if (user) {
                    request['user'] = user;
                }
            });
        } else {
            request['user'] = null;
        }
        return next.handle();
    }
}
