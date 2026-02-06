import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

export const USER_SERVICE_INTERFACE = Symbol('USER_SERVICE_INTERFACE');
export interface  UserServiceInterface {
    createUser(data: CreateUserDto): Promise<User>;
    authenticateUser(email: string, password: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}