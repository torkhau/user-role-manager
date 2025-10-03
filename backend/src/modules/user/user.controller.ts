import { Body, Controller, Get, Headers, Param, Patch, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/database/entities';
import { IResponse } from 'src/types';
import { RoleDTO } from '../role/dtos';
import { UserDTO } from './dtos';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  private toDTO(user: User): UserDTO {
    const { password: _p, ...rest } = user;

    return { ...rest };
  }

  private extractAuthHeaders(headers: Record<string, string>) {
    const userId = headers['x-user-id'];
    const email = headers['x-user-email'];
    const username = headers['x-user-username'];

    if (!userId || !email || !username) throw new UnauthorizedException('Missing required authentication headers');

    return { userId, email, username };
  }

  private parseId(id: string, errorMessage: string): number {
    const parsed = parseInt(id, 10);

    if (isNaN(parsed)) throw new UnauthorizedException(errorMessage);

    return parsed;
  }

  @Get()
  async findAll(): Promise<IResponse<UserDTO[]>> {
    const users = await this.userService.findAll();

    return { data: users.map((user) => this.toDTO(user)) };
  }

  @Patch(':id/roles')
  async updateRoles(
    @Param('id') id: string,
    @Headers() headers: Record<string, string>,
    @Body() rolesDTO: RoleDTO[]
  ): Promise<IResponse<UserDTO>> {
    console.log('headers', headers)
    const { userId, email, username } = this.extractAuthHeaders(headers);

    const targetUserId = this.parseId(id, 'Invalid target user ID');
    const initiatorId = this.parseId(userId, 'Invalid initiator user ID');

    const isAdmin = await this.userService.isUserAdmin(initiatorId, email, username);
    
    if (!isAdmin) throw new UnauthorizedException('You do not have permission to update roles');

    const user = await this.userService.updateRoles(targetUserId, rolesDTO);
    return { data: this.toDTO(user) };
  }
}
