import { Inject, Injectable } from "@nestjs/common";
import { DEFAULT_ROLE } from "../../../modules/role-permission/role-permission.module";
import type { UserServiceInterface } from "../../../modules/user/service/user.service.interface";
import { USER_SERVICE_INTERFACE } from "../../../modules/user/service/user.service.interface";
import { Seeder } from "./core/decorator";
import { SeederInterface } from "./core/seeder.interface";

@Seeder({priority: 2})
@Injectable()
export class UserSeeder implements SeederInterface {
    constructor(
        @Inject(USER_SERVICE_INTERFACE)
        private readonly userService: UserServiceInterface,
    ) {}

    async seed() {
        const users = [
            { name: 'Super Admin', email: 'admin@example.com', password: 'p@ssword123#', roles: [DEFAULT_ROLE] },
        ];

        for (const user of users) {
            const exists = await this.userService.findByEmail(user.email);
            if (!exists) {
                await this.userService.createUser(user);
                console.log(`Seeded user: ${user.email}`);
            }
        }
    }
}