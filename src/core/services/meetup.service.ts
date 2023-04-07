import { Injectable, Inject } from '@nestjs/common';
import { Meetup } from '../entities/meetup.entity';
import { CreateMeetupDto } from '../dto/meetup.dto';
import { UpdateMeetupDto } from '../dto/meetup.dto';
import { Tag } from '../entities/tag.entity';
import { TagService } from './tag.service';

@Injectable()
export class MeetupService {
  constructor(
    @Inject("MEETUPS_REPOSITORY")
    private meetupRepository: typeof Meetup,
    private tagService: TagService,
  ) {}

  public async readAll(): Promise<Meetup[]> {
    return await this.meetupRepository.findAll({
      include: [
        {
          model: Tag,
          all: true,
        }
      ]
    });
  }

  // public async readBy(options: ReadMeetupDto): Promise<Meetup> {
  //   return await this.meetupRepository.findOne({
  //     where: { ...options },
  //   });
  // }

  public async readById(id: number): Promise<Meetup> {
    return await this.meetupRepository.findOne({
      where: { id },
      include: [
        {
          model: Tag,
          all: true,
        }
      ]
    });
  }

  public async create(meetup: CreateMeetupDto): Promise<Meetup> {
    let newMeetup = new Meetup();
    for(let prop in meetup) {
      newMeetup[prop] = meetup[prop];
    }
		let createdMeetup = await this.meetupRepository.create(newMeetup.dataValues);

		for await (const tag of meetup.tags) {
			await createdMeetup.$add('tags', await this.tagService.readById(tag));
		}

		return await this.readById(createdMeetup.id);
  }

  public async update(
    id: number,
    meetup: UpdateMeetupDto
  ): Promise<Meetup> {
    let existingMeetup = await this.readById(id);
    let update = {
      desciption: meetup.description !== undefined ? meetup.description : existingMeetup.description,
      place: meetup.place !== undefined ? meetup.place : existingMeetup.place,
      time: meetup.time !== undefined ? meetup.time : existingMeetup.time,
    }
		let createdMeetup = [... await this.meetupRepository.update(
      update,
      {
        where: { id },
        returning: true,
      }
    )][1][0];
    console.log(meetup.tags)
    if(meetup.tags !== undefined) {
		  for await (const tag of meetup.tags) {
			  await createdMeetup.$add('tags', await this.tagService.readById(tag));
		  }
    }

		return await this.readById(createdMeetup.id);
  }

  public async delete(id: number): Promise<void> {
    let existingMeetup = await this.readById(id);
    existingMeetup.$remove('tags', existingMeetup.dataValues.tags)
    await this.meetupRepository.destroy({
      where: { id },
    });
  }
}