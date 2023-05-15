import { Controller, Get, Post, Delete, Param, Body, Put, NotFoundException, HttpStatus, HttpCode, BadRequestException, UseGuards, Query } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { RoleService } from '../services/role.service';
import { CreateRoleDto, UpdateRoleDto, ReadRoleDto } from '../dto/role.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HasRoles } from '../auth/decorators/has-role.decorator';
import { RolesGuard } from '../auth/services/roles.guard';

@ApiBearerAuth()
@HasRoles("admin")
@UseGuards(RolesGuard)
@UseGuards(AuthGuard("jwt"))
@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly RoleService: RoleService){
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Returns all roles" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  getAllAction(@Body() roleOptions: ReadRoleDto): Promise<Role[]> {
    const { pagination, sorting, ...filter } = roleOptions;
    return this.RoleService.readAllBy({
      pagination,
      sorting,
      filter,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Returns a role with specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Role })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  async getOneAction(@Param('id') id: number): Promise<Role> {
    const role = await this.RoleService.readById(id);
    if( role === null ){
      throw new NotFoundException(`Role with id=${id} does not exist`);
    }
    return role;
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Creates a new role" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Role })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  async createAction(@Body() role: CreateRoleDto): Promise<Role>{
    const roles = await this.RoleService.readAll();
    for(let role of roles) {
      if(role.dataValues.name === role.name) {
        throw new BadRequestException(`Role ${role.name} already exist`);
      }
    }
    return this.RoleService.create(role);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Updates a role with specified id' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Role })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  async updateAction(
    @Param('id') id: number, 
    @Body() role: UpdateRoleDto
  ): Promise<Role> {
      const existingRole = await this.RoleService.readById(id);
      if(existingRole === null){
        throw new NotFoundException(`Role with id=${id} does not exist`);
      }
      const roles = await this.RoleService.readAll();
      for(let role of roles) {
        if(role.dataValues.name === role.name) {
          throw new BadRequestException(`Role ${role.name} already exist`);
        }
      }
      return this.RoleService.update(id, role);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Deletes a role with specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  async deleteAction(@Param('id') id: number): Promise<void>{
    const existingRole = await this.RoleService.readById(id);
    if(existingRole === null){
      throw new NotFoundException(`Role with id=${id} does not exist`);
    }
    return this.RoleService.delete(id);
  }
}