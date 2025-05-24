import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    example: 'operator@example.com', 
    description: 'User email address',
    format: 'email'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    example: 'password123', 
    description: 'User password',
    minLength: 6 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
