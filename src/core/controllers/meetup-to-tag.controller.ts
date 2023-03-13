// import { Controller, Get, Post, Delete, Param, Body, Put, NotFoundException, UseGuards } from '@nestjs/common';
// import { MeetupToTag } from '../entities/meetup-to-tag.entity';
// import { MeetupService } from 'src/services/meetup.service';
// import { TagService } from 'src/services/tag.service';
// import { MeetupToTagService } from '../services/meetup-to-tag.service';
// import { CreateMeetupToTagDto, UpdateMeetupToTagDto } from '../dto/meetup-to-tag.dto';

// @Controller('meetupToTags')
// export class MeetupToTagController {
//   constructor(
//     private readonly MeetupToTagService: MeetupToTagService,
//     private readonly TagService: TagService,
//     private readonly MeetupService: MeetupService,
//     ){
//   }

//   @Get()
//   getAllAction(): Promise<MeetupToTag[]> {
//     return this.MeetupToTagService.readAll();
//   }

//   @Get(':id')
//   async getOneAction(@Param('id') id: number): Promise<MeetupToTag> {
//     const meetupToTag = await this.MeetupToTagService.readById(id);
//     if( meetupToTag === null ){
//       throw new NotFoundException(`MeetupToTag with id=${id} does not exist`);
//     }
//     return meetupToTag;
//   }

//   @Post()
//   async createAction(@Body() meetupToTag: CreateMeetupToTagDto): Promise<MeetupToTag>{
//     const existingMeetup = await this.MeetupService.readById(meetupToTag.meetupId);
//     if(!existingMeetup) {
//       throw new NotFoundException(`Meetup with id=${meetupToTag.meetupId} does not exist`);
//     }
//     const existingTag = await this.TagService.readById(meetupToTag.tagId);
//     if(!existingTag) {
//       throw new NotFoundException(`Tag with id=${meetupToTag.tagId} does not exist`);
//     }
//     const newMeetupToTag = new MeetupToTag();
//     newMeetupToTag.tag = existingTag;
//     newMeetupToTag.meetup = existingMeetup;
//     return this.MeetupToTagService.create(newMeetupToTag);
//   }

//   @Put(':id')
//   async updateAction(@Param('id') id: number, @Body() meetupToTag: UpdateMeetupToTagDto): Promise<MeetupToTag> {
//     const existingMeetupToTag = await this.MeetupToTagService.readById(id);
//     if(existingMeetupToTag === null){
//       throw new NotFoundException(`MeetupToTag with id=${id} does not exist`);
//     }
//     const existingMeetup = await this.MeetupService.readById(meetupToTag.meetupId);
//     if(!existingMeetup) {
//       throw new NotFoundException(`Meetup with id=${meetupToTag.meetupId} does not exist`);
//     }
//     const existingTag = await this.TagService.readById(meetupToTag.tagId);
//     if(!existingTag) {
//       throw new NotFoundException(`Tag with id=${meetupToTag.tagId} does not exist`);
//     }
//     existingMeetupToTag.tag = existingTag;
//     existingMeetupToTag.meetup = existingMeetup;
//     return this.MeetupToTagService.update(existingMeetupToTag);
//   }

//   @Delete(':id')
//   deleteAction(@Param('id') id: number): Promise<void>{
//     return this.MeetupToTagService.delete(id);
//   }
// }