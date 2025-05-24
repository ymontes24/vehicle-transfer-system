import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { Transfer } from './entities/transfer.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Project } from '../projects/entities/project.entity';
import { OrganizationalUnit } from '../organizational-units/entities/organizational-unit.entity';
import { ProjectsModule } from '../projects/projects.module';
import { OrganizationalUnitsModule } from '../organizational-units/organizational-units.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Transfer,
      User,
      Vehicle,
      Project,
      OrganizationalUnit
    ]),
    AuthModule,
    UsersModule,
    ProjectsModule,
    OrganizationalUnitsModule
  ],
  controllers: [TransfersController],
  providers: [TransfersService],
  exports: [TransfersService],
})
export class TransfersModule {}
