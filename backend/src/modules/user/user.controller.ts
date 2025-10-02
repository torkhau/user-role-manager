import { Controller, Get } from '@nestjs/common';
import { User } from 'src/database/entities';
import { IResponse } from 'src/types';
import { UserDTO } from './dtos';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  private toDTO(user: User): UserDTO {
    const { password: _p, ...rest } = user;

    return { ...rest };
  }

  @Get()
  async findAll(): Promise<IResponse<UserDTO[]>> {
    const users = await this.userService.findAll();

    return { data: users.map((user) => this.toDTO(user)) };
  }
}
