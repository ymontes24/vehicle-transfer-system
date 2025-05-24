import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';
import { OrganizationalUnit } from '../../organizational-units/entities/organizational-unit.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum TransferType {
  ACQUISITION = 'acquisition',
  SALE = 'sale',
  RENTAL = 'rental',
  MAINTENANCE = 'maintenance',
  OTHER = 'other'
}

@Entity('transfers')
export class Transfer extends BaseEntity {
  @ApiProperty({
    enum: TransferType,
    example: TransferType.ACQUISITION,
    description: 'Type of vehicle transfer'
  })
  @Column({
    type: 'enum',
    enum: TransferType,
    default: TransferType.OTHER
  })
  type: TransferType;

  @ApiProperty({
    format: 'uuid',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'ID of the vehicle being transferred'
  })
  @Column({ name: 'vehicle_id' })
  vehicleId: string;

  @ApiProperty({
    type: () => Vehicle,
    description: 'Vehicle details'
  })
  @ManyToOne(() => Vehicle, vehicle => vehicle.transfers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @ApiProperty({
    format: 'uuid',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'ID of the client involved in the transfer'
  })
  @Column({ name: 'client_id' })
  clientId: string;

  @ApiProperty({
    type: () => User,
    description: 'Client details'
  })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: User;

  @ApiProperty({
    format: 'uuid',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'ID of the transmitter (user executing the transfer)'
  })
  @Column({ name: 'transmitter_id' })
  transmitterId: string;

  @ApiProperty({
    type: () => User,
    description: 'Transmitter details'
  })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'transmitter_id' })
  transmitter: User;

  @ApiProperty({
    format: 'uuid',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'ID of the project associated with this transfer'
  })
  @Column({ name: 'project_id' })
  projectId: string;

  @ApiProperty({
    type: () => Project,
    description: 'Project details'
  })
  @ManyToOne(() => Project, project => project.transfers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ApiProperty({
    format: 'uuid',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'ID of the organizational unit associated with this transfer'
  })
  @Column({ name: 'organizational_unit_id' })
  organizationalUnitId: string;

  @ApiProperty({
    type: () => OrganizationalUnit,
    description: 'Organizational unit details'
  })
  @ManyToOne(() => OrganizationalUnit, unit => unit.transfers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizational_unit_id' })
  organizationalUnit: OrganizationalUnit;
}
