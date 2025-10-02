import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { Repository } from 'typeorm';
import { DataDTO, LoginBodyDTO } from './dtos';

export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async login({ email, password }: LoginBodyDTO): Promise<DataDTO> {
    try {
      const user = await this.userRepository.findOne({ where: { email }, relations: ['roles'] });

      if (!user) throw new UnauthorizedException('User not found');

      if (user.password !== password) throw new UnauthorizedException('Invalid password');

      const result: DataDTO = { id: user.id, email: user.email, username: user.username };

      const isAdmin = user.roles.some(({ roleName }) => roleName.toLowerCase() === 'admin');

      if (isAdmin) result.isAdmin = true;

      return result;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new InternalServerErrorException('Database error');
    }
  }
}
