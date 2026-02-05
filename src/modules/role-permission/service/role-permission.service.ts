import { Inject, Injectable } from '@nestjs/common';
import { ROLE_REPOSITORY_INTERFACE } from '../repository/role.repository';
import type { RoleRepositoryInterface } from '../repository/role.repository.interface';
import type { RolePermissionServiceInterface } from './role-permission.service.interface';
import { Role } from '../entity/role.entity';

@Injectable()
export class RolePermissionService implements RolePermissionServiceInterface {
    constructor(
        @Inject(ROLE_REPOSITORY_INTERFACE)
        private readonly roleRepository: RoleRepositoryInterface,
    ) {}

    async findRolesByIds(
        ids: string[],
        relations?: { permissions?: boolean },
        select?: any,
    ) : Promise<Role[]> {
        return this.roleRepository.findByIds(ids, relations, select);
    }
}
