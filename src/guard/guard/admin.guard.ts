import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly userRepository: UserRepository) {}

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const req = ctx.switchToHttp().getRequest();
        const userId = req.user.userId;
        const user = await this.userRepository.findOneById(userId);
        if (user?.role.name !== 'admin') {
            throw new UnauthorizedException();
        }
        return true;
    }
}
