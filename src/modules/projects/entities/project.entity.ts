import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { OrganizationalUnit } from '../../organizational-units/entities/organizational-unit.entity';
import { User } from '../../users/entities/user.entity';
import { Transfer } from '../../transfers/entities/transfer.entity';

@Entity('projects')
export class Project extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => OrganizationalUnit, organizationalUnit => organizationalUnit.project)
  organizationalUnits: OrganizationalUnit[];

  @ManyToMany(() => User, user => user.projects)
  users: User[];

  @OneToMany(() => Transfer, transfer => transfer.project)
  transfers: Transfer[];
}
