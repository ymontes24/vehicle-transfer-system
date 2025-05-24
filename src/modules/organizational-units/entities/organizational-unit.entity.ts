import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';
import { Transfer } from '../../transfers/entities/transfer.entity';

@Entity('organizational_units')
export class OrganizationalUnit extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'project_id' })
  projectId: string;

  @ManyToOne(() => Project, project => project.organizationalUnits, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToMany(() => User, user => user.organizationalUnits)
  users: User[];

  @OneToMany(() => Transfer, transfer => transfer.organizationalUnit)
  transfers: Transfer[];
}
