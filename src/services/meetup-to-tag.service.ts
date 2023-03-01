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

  public async deleteTagFromMeetup(meetupId: number, tagId: number): Promise<void> {
    const existingMeetupToTag = await this.meetupToTagRepository
      .createQueryBuilder()
      .select('meetupToTag.id')
      .from(MeetupToTag, 'meetupToTag')
      .where('meetupToTag.meetup_id = :meetupId', { meetupId: meetupId })
      .andWhere('meetupToTag.tag_id = :tagId', { tagId: tagId })
      .getOne();

    if(!existingMeetupToTag) {
      throw new BadRequestException('Such meetup does not have such tag');
    }
    await this.meetupToTagRepository
      .createQueryBuilder()
      .softDelete()
      .from(MeetupToTag)
      .where('meetup_id = :meetupId', { meetupId: meetupId })
      .andWhere('tag_id = :tagId', { tagId: tagId })
      .execute();
  }

  public async readMeetupTags(meetupId: number): Promise<MeetupToTag[]> {
    const queryBuilder = this.meetupToTagRepository.createQueryBuilder();

    return queryBuilder
      .select()
      .from(MeetupToTag, 'meetupToTag')
      .where('meetupToTag.meetup_id = :meetupId', { meetupId: meetupId })
      .getMany();
  }
}