import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { USER_SERVICE_INTERFACE, UserServiceInterface } from '../service/user.service.interface';
import { AssignRoleDto } from '../../role-permission/dto/assign-role.dto';
import { PERMISSIONS } from '../../role-permission/constants/permissions';
import { Can } from '@/shared/decorator/permissions.decorator';
import { AuthenticateGuard } from '@/shared/guard/authenticate.guard';
import { AuthorizeGuard } from '@/shared/guard/authorize.guard';

@Controller('user')
@UseGuards(AuthenticateGuard, AuthorizeGuard)
export class UserController {
  constructor(
    @Inject(USER_SERVICE_INTERFACE)
    private readonly userService: UserServiceInterface
  ) { }

  @Post('assign-role')
  @Can(PERMISSIONS.ROLE.ASSIGN)
  async assignRoleToUser(@Body() data: AssignRoleDto) {
    return this.userService.assignRoleToUser(data);
  }

  getUser() { }
  updateUser() { }
  deleteUser() { }
}
