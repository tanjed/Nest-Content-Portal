import { Controller, Inject, Post } from "@nestjs/common";
import type { JwtServiceInterface } from "src/shared/jwt/jwt.service.interface";
import { JWT_SERVICE_INTERFACE } from "src/shared/jwt/jwt.service.interface";
import { AdminLoginDto } from "../dto/admin-login.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import type { UserServiceInterface } from "../service/user.service.interface";
import { USER_SERVICE_INTERFACE } from "../service/user.service.interface";
import { ROLE_PERMISSION_SERVICE_INTERFACE } from "src/modules/role-permission/service/role-permission.service.interface";
import type { RolePermissionServiceInterface } from "src/modules/role-permission/service/role-permission.service.interface";

@Controller()
export class UserAuthController {
    constructor(
        @Inject(USER_SERVICE_INTERFACE)
        private readonly userService: UserServiceInterface,
        @Inject(JWT_SERVICE_INTERFACE)
        private readonly jwtService: JwtServiceInterface,
        @Inject(ROLE_PERMISSION_SERVICE_INTERFACE)
        private readonly rolePermissionService: RolePermissionServiceInterface,
    ) {}

    @Post('admin/register')
    async createUser(req: CreateUserDto){
        const user = await this.userService.createUser(req);

        return {
            id: user.id,
            name: user.full_name,
            email: user.email,
        };
    }

    @Post('admin/login')
    async login(req: AdminLoginDto){
        const user = await this.userService.authenticateUser(req.email, req.password);

        const token = await this.jwtService.generateToken({
            sub: user.id,
            email: user.email,
            roles: user.roles.map(role => role.name),
            permissions: user.roles.flatMap(role =>
                role.permissions.map(permission => permission.name),
            ),
        })

        return {
            token : token,
        };
    }
}