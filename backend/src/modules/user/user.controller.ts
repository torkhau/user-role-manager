import { Controller, Get } from '@nestjs/common';
import { Role, User } from 'src/database/entities';
import { RoleService } from '../role';
import { EffectiveRoleDTO, UserDTO } from './dtos';
import { UserService } from './user.service';
import { IResponse } from 'src/types';

@Controller('users')
export class UserController {
  constructor(private userService: UserService, private roleService: RoleService) {}

  private toDTO(user: User, roles: Role[]): UserDTO {
    const { password: _p, roles: userRoles, ...rest } = user;

    const isAdmin = userRoles.some((role) => role.roleName === 'Admin');

    if (isAdmin) {
      const effectiveRoles = roles.map(({ id, roleName }) => {
        const roleData: EffectiveRoleDTO = { id, roleName };

        if (roleName !== 'Admin') roleData['disabled'] = true;

        return { ...roleData };
      });

      return { ...rest, roles: userRoles, effectiveRoles };
    }

    return { ...rest, roles: userRoles, effectiveRoles: userRoles };
  }

  @Get()
  async findAll(): Promise<IResponse<UserDTO[]>> {
    const users = await this.userService.findAll();
    const roles = await this.roleService.findAll();

    return {data: users.map((user) => this.toDTO(user, roles))};
  }
}
