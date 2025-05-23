import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { OrganizationalUnitsModule } from './organizational-units/organizational-units.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ProjectsModule } from './projects/projects.module';
import { RolesModule } from './roles/roles.module';
import { TransfersModule } from './transfers/transfers.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    OrganizationalUnitsModule,
    PermissionsModule,
    ProjectsModule,
    RolesModule,
    TransfersModule,
    UsersModule,
    VehiclesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
