import { Controller, Inject } from '@nestjs/common';
import { USER_SERVICE_INTERFACE, UserServiceInterface } from '../service/user.service.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE_INTERFACE)
    private readonly userService: UserServiceInterface
  ) {}
  getUser(){}
  updateUser(){}
  deleteUser(){}
}
