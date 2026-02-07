import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../../shared/base/base.abstract.interface';
import { FindOptionsRelations, FindOptionsSelect, In, Repository } from 'typeorm';
import { Role } from '../entity/role.entity';
import { RoleRepositoryInterface } from './role.repository.interface';

export const ROLE_REPOSITORY_INTERFACE = Symbol('ROLE_REPOSITORY_INTERFACE');

@Injectable()
export class RoleRepository extends BaseRepository<Role> implements RoleRepositoryInterface {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {
        super(roleRepository);
    }

    async findByIds(
        ids: string[],
        relations?: FindOptionsRelations<Role>,
        select?: FindOptionsSelect<Role>,
    ): Promise<Role[]> {
        return this.roleRepository.find({
            where: {
                id: In(ids),
            },
            relations,
            select,
        });
    }

    async findByName(name: string): Promise<Role | null> {
        return this.roleRepository.findOne({
            where: { name: name } as any,
            relations: { permissions: true },
        });
    }
}
