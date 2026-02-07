import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../../shared/base/base.abstract.interface';
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

    async findByName(name: string): Promise<Permission | null> {
        return this.permissionRepository.findOne({ where: { name } as any });
    }

    async findByNames(names: string[]): Promise<Permission[]> {
        return this.permissionRepository.find({
            where: {
                name: In(names),
            },
        });
    }

    async findOrCreate(names: string[]): Promise<Permission[]> {
        const permissions: Permission[] = [];

        for (const name of names) {
            let permission = await this.permissionRepository.findOne({ where: { name } as any });

            if (!permission) {
                permission = this.permissionRepository.create({ name });
                await this.permissionRepository.save(permission);
            }

            permissions.push(permission);
        }

        return permissions;
    }
}
