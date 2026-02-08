import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../../../shared/base/base.abstract.interface";
import { FindOptionsRelations, FindOptionsSelect, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserRepositoryInterface } from "./user.repository.interface";

export class UserRepository extends BaseRepository<User> implements UserRepositoryInterface {
    constructor(
         @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super(userRepository);
    }
    
    async findByEmail(email: string, relations?: FindOptionsRelations<User>, select?: FindOptionsSelect<User>): Promise<User | null> {
        return this.userRepository.findOne({ where: { email }, relations, select });
    }

}