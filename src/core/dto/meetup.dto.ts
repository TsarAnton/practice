import {
	IsArray,
	IsDate,
	IsDefined,
	IsInt,
	IsNotEmpty,
	IsString,
	MaxLength,
    IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMeetupDto {
	@ApiProperty({ description: "Meetup name", nullable: false })
    @IsNotEmpty()
	@MaxLength(100)
	@IsString()
    name: string;

	@ApiProperty({ description: "Meetup description", nullable: false })
    @IsNotEmpty()
	@MaxLength(255)
	@IsString()
    description: string;

	@ApiProperty({ description: "Meetup start time", nullable: false })
	@IsNotEmpty()
    @IsDefined()
	@IsDate()
	@Transform(({ value }) => new Date(value))
    time: Date;

	@ApiProperty({ description: "Meetup place", nullable: false })
    @IsNotEmpty()
	@MaxLength(100)
	@IsString()
    place: string;

	@ApiProperty({ description: "Meetup tags", nullable: false })
    @IsDefined()
	@IsArray()
	@IsInt({ each: true })
    tags: number[];
}

export class UpdateMeetupDto {
	@ApiProperty({ description: "Meetup name", nullable: true })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    name?: string;

	@ApiProperty({ description: "Meetup description", nullable: true })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    description?: string;

    @ApiProperty({ description: "Meetup start time", nullable: true })
    @IsOptional()
	@IsDefined()
	@IsDate()
	@Transform(({ value }) => new Date(value))
    time?: Date;

    @ApiProperty({ description: "Meetup place", nullable: true })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    place?: string;

    @ApiProperty({ description: "Meetup tags", nullable: true })
    @IsOptional()
	@IsArray()
	@IsInt({ each: true })
    tags?: number[];
}