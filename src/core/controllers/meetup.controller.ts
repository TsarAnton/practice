import { Controller, Get, Post, Delete, Param, Body, Put, NotFoundException, BadRequestException, HttpStatus, HttpCode, UseGuards, Query } from '@nestjs/common';
import { Meetup } from '../entities/meetup.entity';
import { MeetupService } from '../services/meetup.service';
import { CreateMeetupDto, UpdateMeetupDto, ReadMeetupDto } from '../dto/meetup.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagService } from '../services/tag.service';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Meetups')
@UseGuards(AuthGuard("jwt"))
@Controller('meetups')
export class MeetupController {
  constructor(
    private readonly meetupService: MeetupService,
    private readonly tagService: TagService,
    ){
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Returns all meetups" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getAllAction(@Body() meetupOptions: ReadMeetupDto): Promise<Meetup[]> {
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
  @ApiOperation({ summary: "Creates a new meetup" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Meetup })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
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
    return this.meetupService.create(meetup);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Updates a meetup with specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Meetup })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async updateAction(
    @Param('id') id: number, 
    @Body() meetup: UpdateMeetupDto
  ): Promise<Meetup> {
      const existingMeetup = await this.meetupService.readById(id);
      if(existingMeetup === null){
        throw new NotFoundException(`Meetup with id=${id} does not exist`);
      }
      let set = new Set();
      let existingTags = new Set(existingMeetup.dataValues.tags.map(tag => tag.id));
      for(let tag of meetup.tags) {
        if(set.has(tag)) {
          throw new BadRequestException(`Tag with id=${tag} appers 2 times`);
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
  @ApiOperation({ summary: "Deletes a meetup with specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async deleteAction(@Param('id') id: number): Promise<void>{
    const existingMeetup = await this.meetupService.readById(id);
    if(existingMeetup === null){
      throw new NotFoundException(`Meetup with id=${id} does not exist`);
    }
    return this.meetupService.delete(id);
  }
}