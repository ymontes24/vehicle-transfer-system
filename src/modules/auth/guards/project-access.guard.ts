import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { OrganizationalUnitsService } from '../../organizational-units/organizational-units.service';

@Injectable()
export class ProjectAccessGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private organizationalUnitsService: OrganizationalUnitsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, body, params, query } = context.switchToHttp().getRequest();
    
    if (!user) {
      return false;
    }

    // Get the project and organizational unit IDs from the request
    const projectId = body?.projectId || params?.projectId || query?.projectId || null;
    const organizationalUnitId = body?.organizationalUnitId || params?.organizationalUnitId || query?.organizationalUnitId || null;

    // If no project or organizational unit is specified, allow the request
    // This is for endpoints that don't require project or org unit validation
    if (!projectId && !organizationalUnitId) {
      return true;
    }

    // Get the user with relations
    const userWithRelations = await this.usersService.findOneWithRelations(user.id);
    if (!userWithRelations) {
      return false;
    }

    // Check if the user has access to the project
    if (projectId && !userWithRelations.belongsToProject(projectId)) {
      throw new ForbiddenException('You do not have access to this project');
    }

    // Check if the user has access to the organizational unit
    if (organizationalUnitId && !userWithRelations.belongsToOrganizationalUnit(organizationalUnitId)) {
      throw new ForbiddenException('You do not have access to this organizational unit');
    }

    // If organizationalUnitId is provided, check if it belongs to the project
    if (projectId && organizationalUnitId) {
      const organizationalUnit = await this.organizationalUnitsService.findOne(organizationalUnitId);
      if (!organizationalUnit || organizationalUnit.projectId !== projectId) {
        throw new ForbiddenException('The organizational unit does not belong to this project');
      }
    }

    return true;
  }
}
