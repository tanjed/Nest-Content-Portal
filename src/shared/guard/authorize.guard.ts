import { CanActivate, ExecutionContext, Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorator/permissions.decorator';
import { User } from '@/modules/admin/user/entities/user.entity';
import { CONTEXT_SERVICE_INTERFACE, ContextServiceInterface } from '../services/context.service.interface';

@Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject(CONTEXT_SERVICE_INTERFACE)
        private readonly contextService: ContextServiceInterface,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredPermissions) {
            return true;
        }

        const user = this.contextService.getItem('user');
        const permissions = this.contextService.getItem('permissions');

        if (!user || !permissions) {
            return false;
        }

        return requiredPermissions.some(permission => permissions.has(permission));
    }
}
