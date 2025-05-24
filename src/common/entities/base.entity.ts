import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiProperty({
    format: 'uuid',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'Unique identifier'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: Date,
    example: '2025-05-23T10:30:00Z',
    description: 'Creation timestamp'
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    example: '2025-05-23T10:35:00Z',
    description: 'Last update timestamp'
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
