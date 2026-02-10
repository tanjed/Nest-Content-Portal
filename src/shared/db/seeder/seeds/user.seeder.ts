import { Inject, Injectable } from "@nestjs/common";
import { DEFAULT_ROLE } from "@/modules/admin/role-permission/role-permission.module";
import type { RolePermissionServiceInterface } from "@/modules/admin/role-permission/service/role-permission.service.interface";
import { ROLE_PERMISSION_SERVICE_INTERFACE } from "@/modules/admin/role-permission/service/role-permission.service.interface";
import type { UserServiceInterface } from "@/modules/admin/user/service/user.service.interface";
import { USER_SERVICE_INTERFACE } from "@/modules/admin/user/service/user.service.interface";
import { Seeder } from ".././core/decorator";
import { SeederInterface } from ".././core/seeder.interface";

@Seeder({ priority: 2 })
@Injectable()
export class UserSeeder implements SeederInterface {
    constructor(
        @Inject(USER_SERVICE_INTERFACE)
        private readonly userService: UserServiceInterface,
        @Inject(ROLE_PERMISSION_SERVICE_INTERFACE)
        private readonly rolePermissionService: RolePermissionServiceInterface,
    ) { }

    async seed() {
        const users = [
            { name: 'Super Admin', email: 'admin@example.com', password: 'P@ssword123#', roleName: DEFAULT_ROLE },
        ];

        for (const user of users) {
            const exists = await this.userService.findByEmail(user.email);
            if (!exists) {
                const role = await this.rolePermissionService.getRoleByName(user.roleName);
                if (!role) {
                    console.error(`Role ${user.roleName} not found, skipping user creation`);
                    continue;
                }
                await this.userService.createUser({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    roles: [role.id],
                });
                console.log(`Seeded user: ${user.email}`);
            }
        }
    }
}