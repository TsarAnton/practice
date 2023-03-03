import { Controller, Get, Post, Delete, Param, Body, Put, NotFoundException } from '@nestjs/common';
import { Tag } from '../entities/tag.entity';
import { TagService } from '../services/tag.service';
import { CreateTagDto, UpdateTagDto } from '../dto/tag.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly TagService: TagService){
  }

  @Get()
  getAllAction(): Promise<Tag[]> {
    return this.TagService.readAll();
  }

  @Get(':id')
  async getOneAction(@Param('id') id: number): Promise<Tag> {
    const tag = await this.TagService.readById(id);
    if( tag === null ){
      throw new NotFoundException(`Tag with id=${id} does not exist`);
    }
    return tag;
  }

  @Post()
  async createAction(@Body() tag: CreateTagDto): Promise<Tag>{
    const newTag = new Tag();
    newTag.name = tag.name;
    return this.TagService.create(newTag);
  }

  @Put(':id')
  async updateAction(@Param('id') id: number, @Body() tag: UpdateTagDto): Promise<Tag> {
      const existingTag = await this.TagService.readById(id);
      if(existingTag === null){
        throw new NotFoundException(`Tag with id=${id} does not exist`);
      }
      existingTag.name = tag.name;
      return this.TagService.update(existingTag);
  }

  @Delete(':id')
  deleteAction(@Param('id') id: number): Promise<void>{
    return this.TagService.delete(id);
  }
}