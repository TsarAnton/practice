import { Injectable, Inject } from '@nestjs/common';
import { Tag } from '../entities/tag.entity';
import { CreateTagDto } from '../dto/tag.dto';
import { UpdateTagDto } from '../dto/tag.dto';

import { defaultPagination } from '../types/constants/pagination.constants';
import { defaultSorting } from '../types/constants/sorting.constants';

import { ITagOptions } from '../types/tag-options';

@Injectable()
export class TagService {
  constructor(
    @Inject("TAGS_REPOSITORY")
    private tagRepository: typeof Tag,
  ) {}

  public async readAll(): Promise<Tag[]> {
    return await this.tagRepository.findAll();
  }

  public async readAllBy(
    options: ITagOptions,
  ): Promise<Tag[]> {
    const pagination = options.pagination === undefined ? defaultPagination : options.pagination;
    const sorting = options.sorting === undefined ? defaultSorting : options.sorting;

    return await this.tagRepository.findAll({
      where: options.filter,
      limit: pagination.size,
      offset: pagination.offset,
      order: [[sorting.column, sorting.direction]],
    });
  }

  public async readById(id: number): Promise<Tag> {
    return await this.tagRepository.findOne({
      where: { id } 
    });
  }

  public async create(tag: CreateTagDto): Promise<Tag> {
    return await this.tagRepository.create(tag);
  }

  public async update(
    id: number,
    tag: UpdateTagDto,
  ): Promise<Tag> {
    return [... await this.tagRepository.update(
			tag,
			{
				where: { id },
				returning: true,
			}
		)][1][0];
  }

  public async delete(id: number): Promise<void> {
    await this.tagRepository.destroy({
      where: { id }
    });
  }
}