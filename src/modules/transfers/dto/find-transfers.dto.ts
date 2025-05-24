import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { TransferType } from '../entities/transfer.entity';

export class FindTransfersDto {
  @IsUUID()
  @IsOptional()
  projectId?: string;

  @IsUUID()
  @IsOptional()
  organizationalUnitId?: string;

  @IsUUID()
  @IsOptional()
  vehicleId?: string;

  @IsUUID()
  @IsOptional()
  clientId?: string;

  @IsUUID()
  @IsOptional()
  transmitterId?: string;

  @IsEnum(TransferType)
  @IsOptional()
  type?: TransferType;
  
  @IsOptional()
  page: number = 1;
  
  @IsOptional()
  limit: number = 10;
}
