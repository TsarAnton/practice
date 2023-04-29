import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateTagDto {
	@ApiProperty({ description: "Tag name", nullable: false })
    @IsNotEmpty()
	@MaxLength(100)
	@IsString()
    name: string;
}

export class UpdateTagDto {
	@ApiProperty({ description: "Tag name", nullable: true })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    name?: string;
}