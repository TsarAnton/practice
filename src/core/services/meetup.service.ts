import { Injectable, Inject } from '@nestjs/common';
import { Meetup } from '../entities/meetup.entity';
import { CreateMeetupDto } from '../dto/meetup.dto';
import { UpdateMeetupDto } from '../dto/meetup.dto';
import { Tag } from '../entities/tag.entity';
import { TagService } from './tag.service';
import { UserService } from './user.service';

import { defaultPagination } from '../types/constants/pagination.constants';
import { defaultSorting } from '../types/constants/sorting.constants';

import { IMeetupOptions } from '../types/meetup-options';

@Injectable()
export class MeetupService {
  constructor(
    @Inject("MEETUPS_REPOSITORY")
    private meetupRepository: typeof Meetup,
    private tagService: TagService,
    private userService: UserService,
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

  public async readAllBy(
    options: IMeetupOptions,
  ): Promise<Meetup[]> {
    const pagination = options.pagination === undefined ? defaultPagination : options.pagination;
    const sorting = options.sorting === undefined ? defaultSorting : options.sorting;

    return await this.meetupRepository.findAll({
      where: options.filter,
      include: {
        model: Tag, 
        all: true, 
      },
      limit: pagination.size,
      offset: pagination.offset,
      order: [[sorting.column, sorting.direction]],
    });
  }

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

  public async create(meetup: CreateMeetupDto, userId: number): Promise<Meetup> {
    let newMeetup = new Meetup();
    for(let prop in meetup) {
      newMeetup[prop] = meetup[prop];
    }

		let createdMeetup = await this.meetupRepository.create(newMeetup.dataValues);

    const registeredUser = await this.userService.readById(userId);

    await createdMeetup.$set('creator', registeredUser);

		for await (const tag of meetup.tags) {
			await createdMeetup.$add('tags', await this.tagService.readById(tag));
		}

		return await this.readById(createdMeetup.id);
  }

  public async addMember(meetupId: number, userId: number): Promise<Meetup> {
    let existingMeetup = await this.readById(meetupId);
    await existingMeetup.$add('members', await this.userService.readById(userId));
    return await this.readById(existingMeetup.id);
  }

  public async update(
    id: number,
    meetup: UpdateMeetupDto
  ): Promise<Meetup> {
    let existingMeetup = await this.readById(id);
    for(let prop in meetup) {
      existingMeetup[prop] = meetup[prop];
    }
		let createdMeetup = [... await this.meetupRepository.update(
      existingMeetup,
      {
        where: { id },
        returning: true,
      }
    )][1][0];
    if(meetup.tags !== undefined) {
		  for await (const tag of meetup.tags) {
			  await createdMeetup.$add('tags', await this.tagService.readById(tag));
		  }
    }

		return await this.readById(createdMeetup.id);
  }

  public async delete(id: number): Promise<void> {
    let existingMeetup = await this.readById(id);
    existingMeetup.$remove('tags', existingMeetup.dataValues.tags);
    existingMeetup.$remove('members', existingMeetup.dataValues.members);
    await this.meetupRepository.destroy({
      where: { id },
    });
  }
}