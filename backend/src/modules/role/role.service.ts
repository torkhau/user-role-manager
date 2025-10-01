import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/database/entities';
import { Repository } from 'typeorm';

export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }
}
