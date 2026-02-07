import { Inject, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { ROLE_PERMISSION_SERVICE_INTERFACE, type RolePermissionServiceInterface } from '../../role-permission/service/role-permission.service.interface';
import { TransactionService } from '../../../shared/db/transaction.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User, UserStatus } from '../entities/user.entity';
import { USER_REPOSITORY_INTERFACE, type UserRepositoryInterface } from '../repository/user.repository.interface';
import type { UserServiceInterface } from './user.service.interface';

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(
        @Inject(USER_REPOSITORY_INTERFACE)
        private readonly userRepository: UserRepositoryInterface,
        @Inject(ROLE_PERMISSION_SERVICE_INTERFACE)
        private readonly rolePermissionService: RolePermissionServiceInterface,
        private readonly transactionService: TransactionService,
    ){}

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

    async authenticateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email, { roles: true });

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
}
