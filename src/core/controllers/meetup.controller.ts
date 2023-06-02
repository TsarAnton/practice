import { Controller, Get, Post, Delete, Param, Body, Put, NotFoundException, BadRequestException, HttpStatus, HttpCode, UseGuards, Query, ForbiddenException } from '@nestjs/common';
import { Meetup } from '../entities/meetup.entity';
import { MeetupService } from '../services/meetup.service';
import { UserService } from '../services/user.service';
import { CreateMeetupDto, UpdateMeetupDto, ReadMeetupDto } from '../dto/meetup.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagService } from '../services/tag.service';
import { AuthGuard } from '@nestjs/passport';
import { HasRoles } from '../auth/decorators/has-role.decorator';
import { RolesGuard } from '../auth/services/roles.guard';

@ApiBearerAuth()
@ApiBearerAuth("JWT authorization")
@ApiTags('Meetups')
@UseGuards(AuthGuard("jwt"))
@Controller('meetups')
export class MeetupController {
  constructor(
    private readonly meetupService: MeetupService,
    private readonly tagService: TagService,
    private readonly userService: UserService,
    ){
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Returns all meetups" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getAllAction(@Query() meetupOptions: ReadMeetupDto): Promise<Meetup[]> {
    const { pagination, sorting, ...filter } = meetupOptions;
    return this.meetupService.readAllBy({
      pagination,
      sorting,
      filter,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Returns a meetup with specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Meetup })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async getOneAction(@Param('id') id: number): Promise<Meetup> {
    const meetup = await this.meetupService.readById(id);
    if( meetup === null ){
      throw new NotFoundException(`Meetup with id=${id} does not exist`);
    }
    return meetup;
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @HasRoles("creator", "admin")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Creates a new meetup" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Meetup })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  async createAction(@Body() meetup: CreateMeetupDto): Promise<Meetup>{
    let set = new Set();
    for(let tag of meetup.tags) {
      if(set.has(tag)) {
        throw new BadRequestException(`Tag with id=${tag} appers 2 times`);
      } else {
        set.add(tag);
      }
      const existingTag = await this.tagService.readById(tag);
      if(existingTag === null) {
        throw new NotFoundException(`Tag with id=${tag} does not exist`);
      }
    }
    const registeredUser = await this.userService.getRegisteredUser();
    return this.meetupService.create(meetup, registeredUser.dataValues.id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @HasRoles("creator", "admin")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Updates a meetup with specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Meetup })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  async updateAction(
    @Param('id') id: number, 
    @Body() meetup: UpdateMeetupDto
  ): Promise<Meetup> {
      const existingMeetup = await this.meetupService.readById(id);
      if(existingMeetup === null){
        throw new NotFoundException(`Meetup with id=${id} does not exist`);
      }
      const registeredUser = await this.userService.getRegisteredUser();
      if(registeredUser.dataValues.id !== existingMeetup.dataValues.creator.id) {
        throw new ForbiddenException(`You are not creator of this meetup`);
      }
      let set = new Set();
      let existingTags = new Set(existingMeetup.dataValues.tags.map(tag => tag.id));
      for(let tag of meetup.tags) {
        if(set.has(tag)) {
          throw new BadRequestException(`Tag with id=${tag} appers 2 or more times`);
        } else {
          set.add(tag);
        }
        if(existingTags.has(tag)) {
          throw new BadRequestException(`Meetup already has tag with id=${tag}`);
        }
      }
      return this.meetupService.update(id, meetup);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @HasRoles("creator", "admin")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Deletes a meetup with specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Forbidden" })
  async deleteAction(@Param('id') id: number): Promise<void>{
    const existingMeetup = await this.meetupService.readById(id);
    if(existingMeetup === null){
      throw new NotFoundException(`Meetup with id=${id} does not exist`);
    }
    const registeredUser = await this.userService.getRegisteredUser();
    if(existingMeetup.creator.id !== registeredUser.id) {
      throw new ForbiddenException(`You are not creator of this meetup`);
    }
    return this.meetupService.delete(id);
  }

  @Post('members/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Sign up for a meetup with specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Meetup })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async signUpAction(
    @Param('id') id: number
  ): Promise<Meetup> {
      const existingMeetup = await this.meetupService.readById(id);
      if(existingMeetup === null){
        throw new NotFoundException(`Meetup with id=${id} does not exist`);
      }
      const registeredUser = await this.userService.getRegisteredUser();
      let existingMembers = new Set(existingMeetup.dataValues.members.map(member => member.id));
      for(let memberId of existingMembers) {
        if(memberId === registeredUser.dataValues.id) {
          throw new BadRequestException(`You are already signd up for a meetup with id=${id}`);
        }
      }
      return this.meetupService.addMember(id, registeredUser.dataValues.id);
  }
}

