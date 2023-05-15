import {
	IsArray,
	IsDate,
	IsDefined,
	IsInt,
	IsNotEmpty,
	IsString,
	MaxLength,
    IsOptional,
	ValidateNested,
	IsObject,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SortingDto } from './common/sorting.dto';
import { PaginationDto } from './common/pagination.dto';

export class CreateMeetupDto {
	@ApiProperty({ description: "Meetup name", required: true })
    @IsNotEmpty()
	@MaxLength(100)
	@IsString()
    name: string;

	@ApiProperty({ description: "Meetup description", required: true })
    @IsNotEmpty()
	@MaxLength(255)
	@IsString()
    description: string;

	@ApiProperty({ description: "Meetup start time", required: true })
	@IsNotEmpty()
    @IsDefined()
	@IsDate()
	@Transform(({ value }) => new Date(value))
    time: Date;

	@ApiProperty({ description: "Meetup place", required: true })
    @IsNotEmpty()
	@MaxLength(100)
	@IsString()
    place: string;

	@ApiProperty({ description: "Meetup tags", required: true })
    @IsDefined()
	@IsArray()
	@IsInt({ each: true })
    tags: number[];
}

export class UpdateMeetupDto {
	@ApiProperty({ description: "Meetup name", required: false })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    name?: string;

	@ApiProperty({ description: "Meetup description", required: false })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    description?: string;

    @ApiProperty({ description: "Meetup start time", required: false })
    @IsOptional()
	@IsDefined()
	@IsDate()
	@Transform(({ value }) => new Date(value))
    time?: Date;

    @ApiProperty({ description: "Meetup place", required: false })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    place?: string;

    @ApiProperty({ description: "Meetup tags", required: false })
    @IsOptional()
	@IsArray()
	@IsInt({ each: true })
    tags?: number[];
}

export class ReadMeetupDto {
	@ApiProperty({ description: "Pagination", required: false })
	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => PaginationDto)
	public pagination?: PaginationDto;

	@ApiProperty({ description: "Sorting", required: false })
	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => SortingDto)
	public sorting?: SortingDto;

	@ApiProperty({ description: "Meetup name", required: false })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    name?: string;

	@ApiProperty({ description: "Meetup description", required: false })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    description?: string;

    @ApiProperty({ description: "Meetup start time", required: false })
    @IsOptional()
	@IsDefined()
	@IsDate()
	@Transform(({ value }) => new Date(value))
    time?: Date;

    @ApiProperty({ description: "Meetup place", required: false })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    place?: string;

    @ApiProperty({ description: "Meetup tags", required: false })
    @IsOptional()
	@IsArray()
	@IsInt({ each: true })
    tags?: number[];
}