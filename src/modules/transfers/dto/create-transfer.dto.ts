import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { TransferType } from '../entities/transfer.entity';

export class CreateTransferDto {
  @IsEnum(TransferType)
  @IsNotEmpty()
  type: TransferType;

  @IsUUID()
  @IsNotEmpty()
  vehicleId: string;

  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @IsUUID()
  @IsNotEmpty()
  transmitterId: string;

  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @IsUUID()
  @IsNotEmpty()
  organizationalUnitId: string;
}
