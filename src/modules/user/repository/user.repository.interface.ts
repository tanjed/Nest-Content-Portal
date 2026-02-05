import { BaseRepositoryInterface } from "src/shared/base/base.repository.interface";
import { User } from "../entities/user.entity";
import { FindOptionsRelations, FindOptionsSelect } from "typeorm";


export const USER_REPOSITORY_INTERFACE = Symbol('USER_REPOSITORY_INTERFACE');
export interface UserRepositoryInterface extends BaseRepositoryInterface<User>{
    findByEmail(email: string, relations?: FindOptionsRelations<User>, select?: FindOptionsSelect<User>): Promise<User | null>;
}