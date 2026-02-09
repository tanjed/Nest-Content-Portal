import { Inject, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { ROLE_PERMISSION_SERVICE_INTERFACE, type RolePermissionServiceInterface } from '../../role-permission/service/role-permission.service.interface';
import { TransactionService } from '@/shared/db/transaction.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AssignRoleDto } from '../../role-permission/dto/assign-role.dto';
import { User, UserStatus } from '../entities/user.entity';
import { USER_REPOSITORY_INTERFACE, type UserRepositoryInterface } from '../repository/user.repository.interface';
import type { UserServiceInterface } from './user.service.interface';
import { FindOptionsRelations } from 'typeorm';

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(
        @Inject(USER_REPOSITORY_INTERFACE)
        private readonly userRepository: UserRepositoryInterface,
        @Inject(ROLE_PERMISSION_SERVICE_INTERFACE)
        private readonly rolePermissionService: RolePermissionServiceInterface,
        private readonly transactionService: TransactionService,
    ) { }

    async createUser(data: CreateUserDto): Promise<User> {
        const user = await this.userRepository.findByEmail(data.email);
        if (user) {
            throw new UnprocessableEntityException('Email already exists');
        }

        const roles = await this.rolePermissionService.findRolesByIds(data.roles);

        if (roles.length !== data.roles.length) {
            throw new NotFoundException('One or more roles not found');
        }

        return this.transactionService.execute(async (queryRunner) => {
            const userData: Partial<User> = {
                full_name: data.name,
                email: data.email,
                password: data.password,
                roles: roles,
            };

            return this.userRepository.create(userData, queryRunner);
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async findById(id: string, relations?: FindOptionsRelations<User>): Promise<User | null> {
        return this.userRepository.find(id, relations);
    }

    async update(id: string, data: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.find(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (data.email && data.email !== user.email) {
            const existingUser = await this.userRepository.findByEmail(data.email);
            if (existingUser) {
                throw new UnprocessableEntityException('Email already exists');
            }
        }

        let roles;
        if (data.roles) {
            roles = await this.rolePermissionService.findRolesByIds(data.roles);
            if (roles.length !== data.roles.length) {
                throw new NotFoundException('One or more roles not found');
            }
        }

        return this.transactionService.execute(async (queryRunner) => {
            const userData: Partial<User> = {};
            if (data.name !== undefined) userData.full_name = data.name;
            if (data.email !== undefined) userData.email = data.email;
            // if (data.password !== undefined) userData.password = data.password;
            if (data.status !== undefined) userData.status = data.status;
            if (data.profileImage !== undefined) userData.profileImage = data.profileImage;
            if (roles !== undefined) userData.roles = roles;

            const updated = await this.userRepository.update(id, userData, queryRunner);
            if (!updated) {
                throw new NotFoundException('User not found');
            }
            return updated;
        });
    }

    async authenticateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email, {
            roles: {
                permissions: true
            }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        if (user.status !== UserStatus.ACTIVE) {
            throw new UnauthorizedException('User account is inactive');
        }

        return user;
    }

    async assignRoleToUser(data: AssignRoleDto): Promise<User> {
        const user = await this.userRepository.find(data.userId, { roles: true });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Fetch all roles by IDs
        const roles = await this.rolePermissionService.findRolesByIds(data.roleIds);

        if (roles.length !== data.roleIds.length) {
            throw new NotFoundException('One or more roles not found');
        }

        return this.transactionService.execute(async (queryRunner) => {
            const userData: Partial<User> = {
                roles: roles
            };
            const updated = await this.userRepository.update(data.userId, userData, queryRunner);

            if (!updated) {
                throw new NotFoundException('User not found');
            }
            return updated;
        });
    }
}
