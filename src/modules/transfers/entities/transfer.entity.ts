import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';
import { OrganizationalUnit } from '../../organizational-units/entities/organizational-unit.entity';

export enum TransferType {
  ACQUISITION = 'acquisition',
  SALE = 'sale',
  RENTAL = 'rental',
  MAINTENANCE = 'maintenance',
  OTHER = 'other'
}

@Entity('transfers')
export class Transfer extends BaseEntity {
  @Column({
    type: 'enum',
    enum: TransferType,
    default: TransferType.OTHER
  })
  type: TransferType;

  @Column({ name: 'vehicle_id' })
  vehicleId: string;

  @ManyToOne(() => Vehicle, vehicle => vehicle.transfers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: User;

  @Column({ name: 'transmitter_id' })
  transmitterId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'transmitter_id' })
  transmitter: User;

  @Column({ name: 'project_id' })
  projectId: string;

  @ManyToOne(() => Project, project => project.transfers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ name: 'organizational_unit_id' })
  organizationalUnitId: string;

  @ManyToOne(() => OrganizationalUnit, unit => unit.transfers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizational_unit_id' })
  organizationalUnit: OrganizationalUnit;
}
