import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { TransferType } from '../entities/transfer.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransferDto {
  @ApiProperty({
    enum: TransferType,
    example: 'acquisition',
    description: 'Type of vehicle transfer'
  })
  @IsEnum(TransferType)
  @IsNotEmpty()
  type: TransferType;

  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'UUID of the vehicle being transferred'
  })
  @IsUUID()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'UUID of the client involved in the transfer'
  })
  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'UUID of the user transmitting the vehicle'
  })
  @IsUUID()
  @IsNotEmpty()
  transmitterId: string;

  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'UUID of the project associated with this transfer'
  })
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'UUID of the organizational unit associated with this transfer'
  })
  @IsUUID()
  @IsNotEmpty()
  organizationalUnitId: string;
}
