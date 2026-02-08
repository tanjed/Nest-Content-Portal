import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repository/user.repository";
import { USER_REPOSITORY_INTERFACE } from "../repository/user.repository.interface";
import { UserService } from "./user.service";
import { USER_SERVICE_INTERFACE } from "./user.service.interface";
import { RolePermissionServiceModule } from "../../../modules/role-permission/service/role-permission.service.module";

@Module({
    imports:[
        forwardRef(() => RolePermissionServiceModule),
        TypeOrmModule.forFeature([User])
    ],
    providers:[
        UserRepository,
        {
            provide: USER_SERVICE_INTERFACE,
            useClass: UserService,
        },
        {
            provide: USER_REPOSITORY_INTERFACE,
            useExisting: UserRepository,
        }
    ],
    exports:[USER_SERVICE_INTERFACE],
})

export class UserServiceModule {}