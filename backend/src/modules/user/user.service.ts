import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from 'src/database/entities';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { RoleDTO } from '../role/dtos';

export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async isUserAdmin(id: number, email?: string, username?: string): Promise<boolean> {
    const where: FindOptionsWhere<User> = {
      id,
    };

    if (email) where.email = email;
    if (username) where.username = username;

    const user = await this.userRepository.findOne({ where, relations: ['roles'] });

    if (!user) return false;

    return user.roles.some(({ roleName }) => roleName === 'Admin');
  }

  async updateRoles(id: number, roles: RoleDTO[]): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['roles'] });

    if (!user) throw new NotFoundException('User not found');

    user.roles = [];

    await this.userRepository.save(user);

    if (roles.length === 0) roles.push({ id: 3, roleName: 'Viewer' } as Role);

    const newRoles = await this.roleRepository.findBy({ id: In(roles.map(({ id }) => id)) });

    user.roles = newRoles;

    return await this.userRepository.save(user);
  }
}
