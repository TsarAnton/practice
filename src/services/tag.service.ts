import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  public async readAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  public async readById(id: number): Promise<Tag> {
    return this.tagRepository.findOneBy({ id });
  }

  public async create(tag: Tag): Promise<Tag> {
     return this.tagRepository.save(tag);
  }

  public async update(tag: Tag): Promise<Tag> {
    return this.tagRepository.save(tag);
  }

  public async delete(id: number): Promise<void> {
    await this.tagRepository.softDelete(id);
  }
}