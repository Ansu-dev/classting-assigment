import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }
    handleRequest(err: any, user: any) {
        if (err || !user) {
            throw new UnauthorizedException();
        } else {
            return user;
        }
    }
}
