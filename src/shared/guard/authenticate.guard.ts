import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type { JwtServiceInterface } from "../jwt/jwt.service.interface";
import { JWT_SERVICE_INTERFACE } from "../jwt/jwt.service.interface";
import { USER_SERVICE_INTERFACE, UserServiceInterface } from "../../modules/user/service/user.service.interface";
import { Reflector } from "@nestjs/core";
import { PUBLIC_ROUTE_KEY } from "../decorator/public-route.decorator";

@Injectable()
export class AuthenticateGuard implements CanActivate {
    constructor(
        @Inject(JWT_SERVICE_INTERFACE)
        private readonly jwtService: JwtServiceInterface,
        @Inject(USER_SERVICE_INTERFACE)
        private readonly userService: UserServiceInterface,
        private readonly reflector: Reflector,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_ROUTE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Unauthorized');
        }

        const token = authHeader.replace('Bearer ', '');

        const payload = await this.jwtService.verifyToken(token);
        const user = await this.userService.findById(payload.sub);

        if (!user) {
            throw new UnauthorizedException('Unauthorized');
        }

        request.permissions = new Set<string>(payload.permissions);
        request.user = user;
        return true;
    }
}