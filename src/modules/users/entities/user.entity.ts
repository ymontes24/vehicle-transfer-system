import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Role } from '../../roles/entities/role.entity';
import { Project } from '../../projects/entities/project.entity';
import { OrganizationalUnit } from '../../organizational-units/entities/organizational-unit.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;
  
  @Exclude()
  @Column({ name: 'password_hash' })
  passwordHash: string;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @ManyToMany(() => Project, project => project.users)
  @JoinTable({
    name: 'user_projects',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'project_id', referencedColumnName: 'id' },
  })
  projects: Project[];

  @ManyToMany(() => OrganizationalUnit, unit => unit.users)
  @JoinTable({
    name: 'user_organizational_units',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'organizational_unit_id', referencedColumnName: 'id' },
  })
  organizationalUnits: OrganizationalUnit[];

  // Helper method to check if user has the given permissions
  hasPermission(permissionName: string): boolean {
    return this.roles.some(role => 
      role.permissions.some(permission => permission.name === permissionName)
    );
  }

  // Helper method to check if user belongs to a specific project
  belongsToProject(projectId: string): boolean {
    return this.projects.some(project => project.id === projectId);
  }

  // Helper method to check if user belongs to a specific organizational unit
  belongsToOrganizationalUnit(organizationalUnitId: string): boolean {
    return this.organizationalUnits.some(unit => unit.id === organizationalUnitId);
  }
}
