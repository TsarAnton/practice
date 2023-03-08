import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeetupToTag } from '../entities/meetup-to-tag.entity';
import { Meetup } from '../entities/meetup.entity';
import { Tag } from '../entities/tag.entity';
import { MeetupService } from './meetup.service';
import { TagService } from './tag.service';

@Injectable()
export class MeetupToTagService {
  constructor(
    @InjectRepository(MeetupToTag)
    private meetupToTagRepository: Repository<MeetupToTag>,
    private meetupService: MeetupService,
    private tagService: TagService,
  ) {}

  public async readMeetupTags(meetupId: number): Promise<MeetupToTag[]> {
    const queryBuilder = this.meetupToTagRepository.createQueryBuilder();

    return queryBuilder
      .select()
      .from(MeetupToTag, 'meetupToTag')
      .where('meetupToTag.meetup_id = :meetupId', { meetupId: meetupId })
      .getMany();
  }

  public async addTagToMeetup(meetupId: number, tagId: number): Promise<MeetupToTag> {
    const existingMeetupToTag = await this.meetupToTagRepository
      .createQueryBuilder()
      .select('meetupToTag.id')
      .from(MeetupToTag, 'meetupToTag')
      .where('meetupToTag.meetup_id = :meetupId', { meetupId: meetupId })
      .andWhere('meetupToTag.tag_id = :tagId', { tagId: tagId })
      .getOne();

    if(existingMeetupToTag) {
      throw new BadRequestException('Such tag has already been added for this meetup');
    }

    const meetupToTag = new MeetupToTag();
    meetupToTag.tag = await this.tagService.readById(tagId);
    meetupToTag.meetup = await this.meetupService.readById(meetupId);
    meetupToTag.deletedAt = null;
    await this.meetupToTagRepository
      .createQueryBuilder()
      .insert()
      .into(MeetupToTag)
      .values(meetupToTag)
      .execute();

    return meetupToTag;
  }

  public async readAll(): Promise<MeetupToTag[]> {
    return this.meetupToTagRepository.find();
  }

  public async readById(id: number): Promise<MeetupToTag> {
    return this.meetupToTagRepository.findOneBy({ id });
  }

  public async create(meetupToTag: MeetupToTag): Promise<MeetupToTag> {
     return this.meetupToTagRepository.save(meetupToTag);
  }

  public async update(meetupToTag: MeetupToTag): Promise<MeetupToTag> {
    return this.meetupToTagRepository.save(meetupToTag);
  }

  public async deleteTagFromMeetup(id: number): Promise<void> {
    await this.meetupToTagRepository.softDelete(id);
  }
}