import { Injectable } from '@nestjs/common';
import type { UserServiceInterface } from './user.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(
        private readonly userRepository: UserServiceInterface,
    ){}
}
