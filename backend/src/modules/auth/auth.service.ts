import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { Repository } from 'typeorm';
import { LoginBodyDTO } from './dtos';

export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async login({ email, password }: LoginBodyDTO) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) throw new UnauthorizedException('User not found');

      if (user.password !== password) throw new UnauthorizedException('Invalid password');

      return { user: { id: user.id, email: user.email, name: user.username } };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new InternalServerErrorException('Database error');
    }
  }
}
