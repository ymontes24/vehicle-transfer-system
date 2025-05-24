import { IsEnum, IsOptional, IsUUID, IsInt, Min } from 'class-validator';
import { TransferType } from '../entities/transfer.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FindTransfersDto {
  @ApiPropertyOptional({
    example: '',
    description: 'Filter transfers by project ID'
  })
  @IsUUID()
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({
    example: '',
    description: 'Filter transfers by organizational unit ID'
  })
  @IsUUID()
  @IsOptional()
  organizationalUnitId?: string;

  @ApiPropertyOptional({
    example: '',
    description: 'Filter transfers by vehicle ID'
  })
  @IsUUID()
  @IsOptional()
  vehicleId?: string;

  @ApiPropertyOptional({
    example: '',
    description: 'Filter transfers by client ID'
  })
  @IsUUID()
  @IsOptional()
  clientId?: string;

  @ApiPropertyOptional({
    example: '',
    description: 'Filter transfers by transmitter ID'
  })
  @IsUUID()
  @IsOptional()
  transmitterId?: string;

  @ApiPropertyOptional({
    enum: TransferType,
    example: 'acquisition',
    description: 'Filter transfers by type'
  })
  @IsEnum(TransferType)
  @IsOptional()
  type?: TransferType;
  
  @ApiPropertyOptional({
    example: 1,
    description: 'Page number for pagination',
    default: 1,
    minimum: 1
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page: number = 1;
  
  @ApiPropertyOptional({
    example: 10,
    description: 'Number of items per page',
    default: 10,
    minimum: 1
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit: number = 10;
}
