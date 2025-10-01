import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { Repository } from 'typeorm';

export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['roles'] });
  }
}
