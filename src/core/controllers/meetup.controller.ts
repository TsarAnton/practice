import { Controller, Get, Post, Delete, Param, Body, Put, NotFoundException } from '@nestjs/common';
import { Meetup } from '../entities/meetup.entity';
import { MeetupService } from '../services/meetup.service';
import { CreateMeetupDto, UpdateMeetupDto } from '../dto/meetup.dto';

@Controller('meetups')
export class MeetupController {
  constructor(private readonly MeetupService: MeetupService){
  }

  @Get()
  getAllAction(): Promise<Meetup[]> {
    return this.MeetupService.readAll();
  }

  @Get(':id')
  async getOneAction(@Param('id') id: number): Promise<Meetup> {
    const meetup = await this.MeetupService.readById(id);
    if( meetup === null ){
      throw new NotFoundException(`Meetup with id=${id} does not exist`);
    }
    return meetup;
  }

  @Post()
  async createAction(@Body() meetup: CreateMeetupDto): Promise<Meetup>{
    const newMeetup = new Meetup();
    newMeetup.name = meetup.name;
    newMeetup.discription = meetup.discription;
    newMeetup.place = meetup.place;
    newMeetup.time = meetup.time;
    console.log(newMeetup)
    return this.MeetupService.create(newMeetup.dataValues);
  }

  @Put(':id')
  async updateAction(@Param('id') id: number, @Body() meetup: UpdateMeetupDto): Promise<Meetup> {
      const existingMeetup = await this.MeetupService.readById(id);
      if(existingMeetup === null){
        throw new NotFoundException(`Meetup with id=${id} does not exist`);
      }
      existingMeetup.name = meetup.name;
      existingMeetup.discription = meetup.discription;
      existingMeetup.place = meetup.place;
      existingMeetup.time = meetup.time;
      return this.MeetupService.update(existingMeetup.dataValues);
  }

  @Delete(':id')
  deleteAction(@Param('id') id: number): Promise<void>{
    return this.MeetupService.delete(id);
  }
}