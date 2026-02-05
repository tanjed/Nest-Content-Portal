import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/shared/base/base.abstract.interface";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "./user.repository.interface";

export class UserRepository extends BaseRepository<User> implements UserRepositoryInterface {
    constructor(
         @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super(userRepository);
    }
    
    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email }, relations: {roles: true} });
    }

}