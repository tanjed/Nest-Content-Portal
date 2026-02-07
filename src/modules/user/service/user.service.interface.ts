import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

export const USER_SERVICE_INTERFACE = Symbol('USER_SERVICE_INTERFACE');
export interface  UserServiceInterface {
    createUser(data: CreateUserDto): Promise<User>;
    findById(id: string, relations?: Record<string, boolean>): Promise<User | null>;
    update(id: string, data: UpdateUserDto): Promise<User>;
    authenticateUser(email: string, password: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}