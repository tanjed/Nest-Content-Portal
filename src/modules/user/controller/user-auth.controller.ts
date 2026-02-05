import { Controller, Inject, Post } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { USER_SERVICE_INTERFACE } from "../service/user.service.interface";
import type { UserServiceInterface } from "../service/user.service.interface";
import { UserService } from "../service/user.service";
import { AdminLoginDto } from "../dto/admin-login.dto";

@Controller()
export class UserAuthController {
    constructor(
        @Inject(USER_SERVICE_INTERFACE)
        private readonly userService: UserServiceInterface,
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

        return {
            id: user.id,
            name: user.full_name,
            email: user.email,
        };
    }
}