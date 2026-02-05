import { BaseRepositoryInterface } from "src/shared/base/base.repository.interface";
import { User } from "../entities/user.entity";


export const USER_REPOSITORY_INTERFACE = Symbol('USER_REPOSITORY_INTERFACE');
export interface UserRepositoryInterface extends BaseRepositoryInterface<User>{}