import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationalUnitsService } from './organizational-units.service';
import { OrganizationalUnit } from './entities/organizational-unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationalUnit])],
  providers: [OrganizationalUnitsService],
  exports: [OrganizationalUnitsService],
})
export class OrganizationalUnitsModule {}
