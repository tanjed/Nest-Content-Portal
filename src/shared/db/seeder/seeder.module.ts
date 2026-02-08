import { Module } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import { ContentServiceModule } from "@/modules/admin/content/service/content.service.module";
import { RolePermissionServiceModule } from "@/modules/admin/role-permission/service/role-permission.service.module";
import { UserServiceModule } from "@/modules/admin/user/service/user.service.module";
import { PermissionSeeder } from "./seeds/permission.seeder";
import { RolePermissionSeeder } from "./seeds/role.seeder";
import { UserSeeder } from "./seeds/user.seeder";
import { SeederService } from "./seeder.service";

@Module({
    imports: [DiscoveryModule, ContentServiceModule, RolePermissionServiceModule, UserServiceModule],
    providers: [PermissionSeeder, RolePermissionSeeder, UserSeeder, SeederService],
    exports: [SeederService],
})

export class SeederModule { }