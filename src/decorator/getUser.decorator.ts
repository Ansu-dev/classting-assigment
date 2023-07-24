import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// * AccesstokenGuard / JwtInterceptor와 사용
export const GetUserId = createParamDecorator((_, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const userId = req.user ? req.user['userId'] : 0;
    return userId;
});
