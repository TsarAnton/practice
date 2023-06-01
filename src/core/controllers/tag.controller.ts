import { Controller, Get, Post, Delete, Param, Body, Put, NotFoundException, HttpStatus, HttpCode, UseGuards, Query } from '@nestjs/common';
import { Tag } from '../entities/tag.entity';
import { TagService } from '../services/tag.service';
import { CreateTagDto, UpdateTagDto, ReadTagDto } from '../dto/tag.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(private readonly TagService: TagService){
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Returns all tags" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getAllAction(@Query() tagOptions: ReadTagDto): Promise<Tag[]> {
    const { pagination, sorting, ...filter } = tagOptions;
    return this.TagService.readAllBy({
      pagination,
      sorting,
      filter,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Returns a tag with specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Tag })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async getOneAction(@Param('id') id: number): Promise<Tag> {
    const tag = await this.TagService.readById(id);
    if( tag === null ){
      throw new NotFoundException(`Tag with id=${id} does not exist`);
    }
    return tag;
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Creates a new tag" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Tag })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async createAction(@Body() tag: CreateTagDto): Promise<Tag>{
    return this.TagService.create(tag);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Updates a tag with specified id' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Tag })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async updateAction(
    @Param('id') id: number, 
    @Body() tag: UpdateTagDto
  ): Promise<Tag> {
      const existingTag = await this.TagService.readById(id);
      if(existingTag === null){
        throw new NotFoundException(`Tag with id=${id} does not exist`);
      }
      return this.TagService.update(id, tag);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Deletes a tag with specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async deleteAction(@Param('id') id: number): Promise<void>{
    const existingTag = await this.TagService.readById(id);
    if(existingTag === null){
      throw new NotFoundException(`Tag with id=${id} does not exist`);
    }
    return this.TagService.delete(id);
  }
}