import { Injectable, Inject } from '@nestjs/common';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @Inject("TAGS_REPOSITORY")
    private tagRepository: typeof Tag,
  ) {}

  public async readAll(): Promise<Tag[]> {
    return this.tagRepository.findAll();
  }

  public async readById(id: number): Promise<Tag> {
    return this.tagRepository.findOne({
      where: { id } 
    });
  }

  public async create(tag: Tag): Promise<Tag> {
     return this.tagRepository.create(tag);
  }

  public async update(tag: Tag): Promise<Tag> {
    return this.tagRepository.create(tag);
  }

  public async delete(id: number): Promise<void> {
    await this.tagRepository.destroy({
      where: { id }
    });
  }
}