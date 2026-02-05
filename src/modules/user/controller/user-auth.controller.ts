import { Controller } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";

@Controller()
export class UserAuthController {
    constructor() {}
    createUser(data: CreateUserDto){}
    login(){}
}