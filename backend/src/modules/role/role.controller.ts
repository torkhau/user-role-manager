import { Controller, Get } from '@nestjs/common';
import { Role } from 'src/database/entities';
import { RoleDTO } from './dtos';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  private toDTO(role: Role): RoleDTO {
    return { ...role };
  }

  @Get()
  async findAll(): Promise<RoleDTO[]> {
    const roles = await this.roleService.findAll();

    return roles.map((role) => this.toDTO(role));
  }
}
