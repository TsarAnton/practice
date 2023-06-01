import { Controller, Get, Post, Delete, Param, Body, Put, NotFoundException, BadRequestException, HttpStatus, HttpCode, UseGuards, Query } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto, ReadUserDto } from '../dto/user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from '../services/role.service';
import { AuthGuard } from '@nestjs/passport';
import { HasRoles } from '../auth/decorators/has-role.decorator';
import { RolesGuard } from '../auth/services/roles.guard';

@ApiBearerAuth()
@HasRoles("admin")
@UseGuards(RolesGuard)
@UseGuards(AuthGuard("jwt"))
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    ){
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Returns all users" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  getAllAction(@Query() userOptions: ReadUserDto): Promise<User[]> {
    const { pagination, sorting, ...filter } = userOptions;
    return this.userService.readAllBy({
      pagination,
      sorting,
      filter,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Returns a user with specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  async getOneAction(@Param('id') id: number): Promise<User> {
    const user = await this.userService.readById(id);
    if( user === null ){
      throw new NotFoundException(`User with id=${id} does not exist`);
    }
    return user;
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Creates a new user" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  async createAction(@Body() user: CreateUserDto): Promise<User>{
    const existingUser = await this.userService.readBy({ login: user.login });
    if(existingUser !== null) {
      throw new BadRequestException(`USer with login=${user.login} already exist`);
    }
    let set = new Set();
    for(let role of user.roles) {
      if(set.has(role)) {
        throw new BadRequestException(`Role with id=${role} appers 2 times`);
      } else {
        set.add(role);
      }
      const existingRole = await this.roleService.readById(role);
      if(existingRole === null) {
        throw new NotFoundException(`Role with id=${role} does not exist`);
      }
    }
    return this.userService.create(user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Updates a user with specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  async updateAction(
    @Param('id') id: number, 
    @Body() user: UpdateUserDto
  ): Promise<User> {
      const existingUser = await this.userService.readById(id);
      if(existingUser === null){
        throw new NotFoundException(`User with id=${id} does not exist`);
      }
      let set = new Set();
      let existingRoles = new Set(existingUser.dataValues.roles.map(role => role.id));
      for(let role of user.roles) {
        if(set.has(role)) {
          throw new BadRequestException(`Role with id=${role} appers 2 times`);
        } else {
          set.add(role);
        }
        if(existingRoles.has(role)) {
          throw new BadRequestException(`User already has role with id=${role}`);
        }
      }
      return this.userService.update(id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Deletes a user with specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  async deleteAction(@Param('id') id: number): Promise<void>{
    const existingUser = await this.userService.readById(id);
    if(existingUser === null){
      throw new NotFoundException(`User with id=${id} does not exist`);
    }
    return this.userService.delete(id);
  }
}