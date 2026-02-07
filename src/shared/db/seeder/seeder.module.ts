import { Module } from "@nestjs/common";
import { RolePermissionServiceModule } from "../../../modules/role-permission/service/role-permission.service.module";
import { PermissionSeeder } from "./seeds/permission.seeder";
import { RolePermissionSeeder } from "./seeds/role.seeder";
import { UserSeeder } from "./seeds/user.seeder";
import { SeederService } from "./seeder.service";

@Module({
    imports: [RolePermissionServiceModule],
    providers: [PermissionSeeder, RolePermissionSeeder, UserSeeder, SeederService],
    exports: [SeederService],
})

export class SeederModule {}