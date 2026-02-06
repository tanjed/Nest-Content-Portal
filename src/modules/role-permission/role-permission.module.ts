import { Module } from "@nestjs/common";

export const DEFAULT_ROLE = 'SUPER_ADMIN';
@Module({
    imports: [RolePermissionModule],
})
export class RolePermissionModule {}