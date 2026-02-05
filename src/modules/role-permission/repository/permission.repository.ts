import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/shared/base/base.abstract.interface';
import { FindOptionsRelations, FindOptionsSelect, In, Repository } from 'typeorm';
import { Permission } from '../entity/permission.entity';
import { PermissionRepositoryInterface } from './permission.repository.interface';

export const PERMISSION_REPOSITORY_INTERFACE = Symbol('PERMISSION_REPOSITORY_INTERFACE');

export class PermissionRepository extends BaseRepository<Permission> implements PermissionRepositoryInterface {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) {
        super(permissionRepository);
    }

    async findByIds(
        ids: string[],
        relations?: FindOptionsRelations<Permission>,
        select?: FindOptionsSelect<Permission>,
    ): Promise<Permission[]> {
        return this.permissionRepository.find({
            where: {
                id: In(ids),
            },
            relations,
            select,
        });
    }
}
