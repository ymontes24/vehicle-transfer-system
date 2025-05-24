import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationalUnitsModule } from './modules/organizational-units/organizational-units.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { RolesModule } from './modules/roles/roles.module';
import { TransfersModule } from './modules/transfers/transfers.module';
import { UsersModule } from './modules/users/users.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';

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
