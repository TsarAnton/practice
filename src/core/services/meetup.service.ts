import { Injectable, Inject } from '@nestjs/common';
import { Meetup } from '../entities/meetup.entity';

@Injectable()
export class MeetupService {
  constructor(
    @Inject("MEETUPS_REPOSITORY")
    private meetupRepository: typeof Meetup,
  ) {}

  public async readAll(): Promise<Meetup[]> {
    return this.meetupRepository.findAll();
  }

  public async readById(id: number): Promise<Meetup> {
    return this.meetupRepository.findOne({
      where: { id },
    });
  }

  public async create(meetup: Meetup): Promise<Meetup> {
     return this.meetupRepository.create(meetup);
  }

  public async update(meetup: Meetup): Promise<Meetup> {
    return this.meetupRepository.create(meetup);
  }

  public async delete(id: number): Promise<void> {
    await this.meetupRepository.destroy({
      where: { id },
    });
  }
}