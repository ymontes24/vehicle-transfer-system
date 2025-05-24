import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { FindTransfersDto } from './dto/find-transfers.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { ProjectAccessGuard } from '../auth/guards/project-access.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { User } from '../users/entities/user.entity';
import { Request } from 'express';
import { ApiOperation, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
@ApiTags('transfers')
@ApiSecurity('cookie-auth')
@Controller('transfers')
@UseGuards(JwtAuthGuard, PermissionsGuard, ProjectAccessGuard)
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Post()
  @RequirePermissions('create_transfers')
  @ApiOperation({ summary: 'Create a new transfer record' })
  create(@Body() createTransferDto: CreateTransferDto, @Req() _req: Request) {
    return this.transfersService.create(createTransferDto);
  }

  @Get()
  @RequirePermissions('view_transfers')
  @ApiOperation({ summary: 'Find all transfers with filtering and pagination' })
  findAll(@Query() findTransfersDto: FindTransfersDto, @Req() req: Request & { user: User }) {
    return this.transfersService.findAll(req.user, findTransfersDto);
  }

  @Get(':id')
  @RequirePermissions('view_transfers')
  @ApiOperation({ summary: 'Find a transfer by ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID of the transfer to find',
    type: 'string',
    format: 'uuid',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  })
  findOne(@Param('id') id: string, @Req() req: Request & { user: User }) {
    return this.transfersService.findOne(id, req.user);
  }

  @Patch(':id')
  @RequirePermissions('edit_transfers')
  @ApiOperation({ summary: 'Update a transfer by ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID of the transfer to update',
    type: 'string',
    format: 'uuid',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  })
  update(@Param('id') id: string, @Body() updateTransferDto: UpdateTransferDto, @Req() req: Request & { user: User }) {
    return this.transfersService.update(id, updateTransferDto, req.user);
  }

  @Delete(':id')
  @RequirePermissions('delete_transfers')
  @ApiOperation({ summary: 'Delete a transfer by ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID of the transfer to delete',
    type: 'string',
    format: 'uuid',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  })
  remove(@Param('id') id: string, @Req() req: Request & { user: User }) {
    return this.transfersService.remove(id, req.user);
  }
}
