import { Body, Controller, HttpStatus, Inject, Post } from "@nestjs/common";
import type { JwtServiceInterface } from "../../../shared/jwt/jwt.service.interface";
import { JWT_SERVICE_INTERFACE } from "../../../shared/jwt/jwt.service.interface";
import { AdminLoginDto } from "../dto/admin-login.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import type { UserServiceInterface } from "../service/user.service.interface";
import { USER_SERVICE_INTERFACE } from "../service/user.service.interface";
import { ROLE_PERMISSION_SERVICE_INTERFACE } from "../../role-permission/service/role-permission.service.interface";
import type { RolePermissionServiceInterface } from "../../role-permission/service/role-permission.service.interface";
import { Can } from "../../../shared/decorator/permissions.decorator";
import { PERMISSIONS } from "../../../modules/role-permission/constants/permissions";
import { AuthenticateGuard } from "src/shared/guard/authenticate.guard";
import { AuthorizeGuard } from "src/shared/guard/authorize.guard";
import { UseGuards } from "@nestjs/common";
import { Public } from "@/shared/decorator/public-route.decorator";

@Controller('admin/auth')
@UseGuards(AuthenticateGuard)
@UseGuards(AuthorizeGuard)
export class UserAuthController {
    constructor(
        @Inject(USER_SERVICE_INTERFACE)
        private readonly userService: UserServiceInterface,
        @Inject(JWT_SERVICE_INTERFACE)
        private readonly jwtService: JwtServiceInterface,
        @Inject(ROLE_PERMISSION_SERVICE_INTERFACE)
        private readonly rolePermissionService: RolePermissionServiceInterface,
    ) { }

    @Post('register')
    @Can(PERMISSIONS.USER.CREATE)
    async createUser(@Body() body: CreateUserDto) {
        const user = await this.userService.createUser(body);

        return {
            id: user.id,
            name: user.full_name,
            email: user.email,
        };
    }

    @Post('login')
    @Public()
    async login(@Body() body: AdminLoginDto) {
        const user = await this.userService.authenticateUser(body.email, body.password);

        const token = await this.jwtService.generateToken({
            sub: user.id,
            email: user.email,
            roles: user.roles?.map(role => role.name) || [],
            permissions: user.roles?.flatMap(role =>
                role.permissions?.map(permission => permission.name) || [],
            ) || [],
        });

        return {
            statusCode: HttpStatus.OK,
            message: 'Login successful',
            expires_in: 43635645,
            token: token,
        };
    }
}