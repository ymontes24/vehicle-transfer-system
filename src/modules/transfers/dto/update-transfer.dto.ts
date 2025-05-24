import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { TransferType } from '../entities/transfer.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransferDto {
    @ApiProperty({
        enum: TransferType,
        example: 'acquisition',
        description: 'Type of vehicle transfer'
      })
      @IsEnum(TransferType)
      @IsOptional()
      type: TransferType;
    
      @ApiProperty({
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        description: 'UUID of the vehicle being transferred'
      })
      @IsUUID()
      @IsOptional()
      vehicleId: string;
    
      @ApiProperty({
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        description: 'UUID of the client involved in the transfer'
      })
      @IsUUID()
      @IsOptional()
      clientId: string;
    
      @ApiProperty({
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        description: 'UUID of the user transmitting the vehicle'
      })
      @IsUUID()
      @IsOptional()
      transmitterId: string;
    
      @ApiProperty({
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        description: 'UUID of the project associated with this transfer'
      })
      @IsUUID()
      @IsOptional()
      projectId: string;
    
      @ApiProperty({
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        description: 'UUID of the organizational unit associated with this transfer'
      })
      @IsUUID()
      @IsOptional()
      organizationalUnitId: string;
}
