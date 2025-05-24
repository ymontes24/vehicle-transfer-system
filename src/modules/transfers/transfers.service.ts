import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, In } from 'typeorm';
import { Transfer } from './entities/transfer.entity';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { FindTransfersDto } from './dto/find-transfers.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { instanceToPlain } from 'class-transformer';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Project } from '../projects/entities/project.entity';
import { OrganizationalUnit } from '../organizational-units/entities/organizational-unit.entity';

@Injectable()
export class TransfersService {
  constructor(
    @InjectRepository(Transfer)
    private transfersRepository: Repository<Transfer>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(OrganizationalUnit)
    private organizationalUnitRepository: Repository<OrganizationalUnit>,
    private usersService: UsersService,
  ) {}

  async create(createTransferDto: CreateTransferDto): Promise<Transfer> {
    const [vehicle, client, transmitter, project, organizationalUnit] = await Promise.all([
      this.vehicleRepository.findOne({ where: { id: createTransferDto.vehicleId } }),
      this.userRepository.findOne({ where: { id: createTransferDto.clientId } }),
      this.userRepository.findOne({ where: { id: createTransferDto.transmitterId } }),
      this.projectRepository.findOne({ where: { id: createTransferDto.projectId } }),
      this.organizationalUnitRepository.findOne({ where: { id: createTransferDto.organizationalUnitId } }),
    ]);

    if (!vehicle) throw new NotFoundException(`Vehicle with ID ${createTransferDto.vehicleId} not found`);
    if (!client) throw new NotFoundException(`Client with ID ${createTransferDto.clientId} not found`);
    if (!transmitter) throw new NotFoundException(`Transmitter with ID ${createTransferDto.transmitterId} not found`);
    if (!project) throw new NotFoundException(`Project with ID ${createTransferDto.projectId} not found`);
    if (!organizationalUnit) throw new NotFoundException(`Organizational Unit with ID ${createTransferDto.organizationalUnitId} not found`);

    const transferToSave = this.transfersRepository.create(createTransferDto);
    await this.transfersRepository.save(transferToSave);

    const transfer = await this.transfersRepository.findOne({
      where: { 
        id: transferToSave.id,
      },
      relations: ['vehicle', 'client', 'transmitter', 'project', 'organizationalUnit'],
    });
    
    return instanceToPlain(transfer) as Transfer;
  }

  async findAll(user: User, findTransfersDto: FindTransfersDto): Promise<{ items: Transfer[]; total: number }> {
    const { page = 1, limit = 10, ...filters } = findTransfersDto;
    const skip = (page - 1) * limit;

    const userWithRelations = await this.usersService.findOneWithRelations(user.id);
    
    // Get the user's projects and organizational units IDs
    const projectIds = userWithRelations.projects.map(project => project.id);
    const orgUnitIds = userWithRelations.organizationalUnits.map(unit => unit.id);
    
    // Create where clause based on user access and filters
    const where: FindOptionsWhere<Transfer> = {};
    
    // Filter by user's accessible projects and organizational units
    if (filters.projectId) {
      if (!projectIds.includes(filters.projectId)) {
        throw new BadRequestException('You do not have access to this project');
      }
      where.projectId = filters.projectId;
    } else {
      where.projectId = In(projectIds);
    }
    
    if (filters.organizationalUnitId) {
      if (!orgUnitIds.includes(filters.organizationalUnitId)) {
        throw new BadRequestException('You do not have access to this organizational unit');
      }
      where.organizationalUnitId = filters.organizationalUnitId;
    } else {
      where.organizationalUnitId = In(orgUnitIds);
    }
    
    // Apply additional filters
    if (filters.vehicleId) where.vehicleId = filters.vehicleId;
    if (filters.clientId) where.clientId = filters.clientId;
    if (filters.transmitterId) where.transmitterId = filters.transmitterId;
    if (filters.type) where.type = filters.type;
    
    // Execute query with pagination
    const [items, total] = await this.transfersRepository.findAndCount({
      where,
      skip,
      take: limit,
      relations: ['vehicle', 'client', 'transmitter', 'project', 'organizationalUnit'],
      order: { createdAt: 'DESC' },
    });
    
    return {
      items: items.map(item => instanceToPlain(item)) as Transfer[],
      total
    };
  }

  async findOne(id: string, user: User): Promise<Transfer> {
    const userWithRelations = await this.usersService.findOneWithRelations(user.id);
    // Get the user's projects and organizational units IDs
    const projectIds = userWithRelations.projects.map(project => project.id);
    const orgUnitIds = userWithRelations.organizationalUnits.map(unit => unit.id);
    
    const transfer = await this.transfersRepository.findOne({
      where: { 
        id,
        projectId: In(projectIds),
        organizationalUnitId: In(orgUnitIds)
      },
      relations: ['vehicle', 'client', 'transmitter', 'project', 'organizationalUnit'],
    });
    
    if (!transfer) {
      throw new NotFoundException(`Transfer with ID ${id} not found or you don't have access to it`);
    }
    
    return instanceToPlain(transfer) as Transfer;
  }

  async update(id: string, updateTransferDto: UpdateTransferDto, user: User): Promise<Transfer> {
    // Check if transfer exists
    const transfer = await this.transfersRepository.findOne({
      where: { id }
    });

    if (!transfer) {
      throw new NotFoundException(`Transfer with ID ${id} not found or you don't have access to it`);
    }

    Object.assign(transfer, updateTransferDto);

    await this.transfersRepository.save(transfer);

    return await this.findOne(id, user);
  }

  async remove(id: string, user: User): Promise<void> {
    const transfer = await this.findOne(id, user);
    
    await this.transfersRepository.remove(transfer);
  }
}
