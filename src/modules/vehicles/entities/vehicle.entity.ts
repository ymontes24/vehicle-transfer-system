import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Transfer } from '../../transfers/entities/transfer.entity';

@Entity('vehicles')
export class Vehicle extends BaseEntity {
  @Column({ unique: true })
  plate: string;

  @Column()
  service: string;

  @OneToMany(() => Transfer, transfer => transfer.vehicle)
  transfers: Transfer[];
}
