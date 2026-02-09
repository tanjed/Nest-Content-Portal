import { FindOptionsRelations } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

import { AssignRoleDto } from "../../role-permission/dto/assign-role.dto";

export const USER_SERVICE_INTERFACE = Symbol('USER_SERVICE_INTERFACE');
export interface UserServiceInterface {
    createUser(data: CreateUserDto): Promise<User>;
    findById(id: string, relations?: FindOptionsRelations<User>): Promise<User | null>;
    update(id: string, data: UpdateUserDto): Promise<User>;
    authenticateUser(email: string, password: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    assignRoleToUser(data: AssignRoleDto): Promise<User>;
}