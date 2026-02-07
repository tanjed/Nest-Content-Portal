import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type { JwtServiceInterface } from "../jwt/jwt.service.interface";
import { JWT_SERVICE_INTERFACE } from "../jwt/jwt.service.interface";
import { USER_SERVICE_INTERFACE, UserServiceInterface } from "../../modules/user/service/user.service.interface";

@Injectable()
export class AuthenticateGuard implements CanActivate {
    constructor(
        @Inject(JWT_SERVICE_INTERFACE)
        private readonly jwtService: JwtServiceInterface,
        @Inject(USER_SERVICE_INTERFACE)
        private readonly userService: UserServiceInterface,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization.replace('Bearer ', '');

        if (!token) {
            throw new UnauthorizedException('Unauthorized');
        }

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