import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meetup } from '../entities/meetup.entity';

@Injectable()
export class MeetupService {
  constructor(
    @InjectRepository(Meetup)
    private meetupRepository: Repository<Meetup>,
  ) {}

  public async readAll(): Promise<Meetup[]> {
    return this.meetupRepository.find();
  }

  public async readById(id: number): Promise<Meetup> {
    return this.meetupRepository.findOneBy({ id });
  }

  public async create(meetup: Meetup): Promise<Meetup> {
     return this.meetupRepository.save(meetup);
  }

  public async update(meetup: Meetup): Promise<Meetup> {
    return this.meetupRepository.save(meetup);
  }

  public async delete(id: number): Promise<void> {
    await this.meetupRepository.softDelete(id);
  }
}