import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  
  async findOneWithRelations(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: [
        'roles', 
        'roles.permissions', 
        'projects', 
        'organizationalUnits',
        'organizationalUnits.project',
      ],
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'username', 'email', 'passwordHash', 'createdAt'],
    });
  }
}
