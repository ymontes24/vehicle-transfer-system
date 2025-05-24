import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationalUnit } from './entities/organizational-unit.entity';

@Injectable()
export class OrganizationalUnitsService {
  constructor(
    @InjectRepository(OrganizationalUnit)
    private organizationalUnitsRepository: Repository<OrganizationalUnit>,
  ) {}

  async findOne(id: string): Promise<OrganizationalUnit> {
    const organizationalUnit = await this.organizationalUnitsRepository.findOne({
      where: { id },
      relations: ['project'],
    });
    
    if (!organizationalUnit) {
      throw new NotFoundException(`Organizational Unit with ID ${id} not found`);
    }
    
    return organizationalUnit;
  }
}
