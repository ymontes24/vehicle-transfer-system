import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Load user with relations to get roles and permissions
    const userWithRelations = await this.usersService.findOneWithRelations(user.id);

    // Create payload for JWT
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    // Generate JWT token
    const token = this.jwtService.sign(payload);

    // Return user data (excluding password) and token
    const { passwordHash, ...userWithoutPassword } = user;
    return {
      user: {
        ...userWithoutPassword,
        roles: userWithRelations.roles,
        projects: userWithRelations.projects,
        organizationalUnits: userWithRelations.organizationalUnits,
      },
      token,
    };
  }

  async getProfile(user: any) {
    // Get user with all relations for complete profile information
    const userWithRelations = await this.usersService.findOneWithRelations(user.id);
    
    // Extract permissions from roles
    const permissions = userWithRelations.roles.flatMap(role => role.permissions);
    
    // Return complete user profile
    return {
      id: userWithRelations.id,
      username: userWithRelations.username,
      email: userWithRelations.email,
      roles: userWithRelations.roles,
      permissions,
      projects: userWithRelations.projects,
      organizationalUnits: userWithRelations.organizationalUnits,
    };
  }
}
