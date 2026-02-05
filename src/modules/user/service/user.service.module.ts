import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repository/user.repository";
import { USER_REPOSITORY_INTERFACE } from "../repository/user.repository.interface";
import { UserService } from "./user.service";
import { USER_SERVICE_INTERFACE } from "./user.service.interface";

@Module({
    imports:[
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