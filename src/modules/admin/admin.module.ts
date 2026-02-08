import { TEMP_PATH } from "@/app.module";
import { QueueModule } from "@/infrastructure/queue/queue.module";
import { DatabaseModule } from "@/shared/db/database.module";
import { SharedModule } from "@/shared/shared.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { ContentModule } from "../content/content.module";
import { UserModule } from "../user/user.module";
import { CategoryModule } from "../category/category.module";
import { RolePermissionModule } from "../role-permission/role-permission.module";

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