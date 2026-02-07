import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorator/permissions.decorator';
import { User } from '../../modules/user/entities/user.entity';

@Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredPermissions) {
            return true;
        }

        const { user, permissions } = context.switchToHttp().getRequest();

        if (!user) {
            return false;
        }

        return requiredPermissions.some(permission => permissions.has(permission));
    }
}
