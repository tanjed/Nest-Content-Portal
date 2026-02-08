import { TEMP_PATH } from "@/shared/constants";
import { QueueModule } from "@/infrastructure/queue/queue.module";
import { DatabaseModule } from "@/shared/db/database.module";
import { SharedModule } from "@/shared/shared.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { ContentModule } from "@/modules/admin/content/content.module";
import { UserModule } from "@/modules/admin/user/user.module";
import { CategoryModule } from "@/modules/admin/category/category.module";
import { RolePermissionModule } from "@/modules/admin/role-permission/role-permission.module";

@Module({
    imports: [
        MulterModule.register({
            storage: {
                destination: TEMP_PATH,
                filename: (_, file, cb) => {
                    cb(null, `${Date.now()}-${file.originalname}`);
                },
            }
        }),
        QueueModule,
        ContentModule,
        UserModule,
        CategoryModule,
        RolePermissionModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AdminModule { }