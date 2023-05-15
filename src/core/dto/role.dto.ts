import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	IsObject,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SortingDto } from './common/sorting.dto';
import { PaginationDto } from './common/pagination.dto';

export class CreateRoleDto {
	@ApiProperty({ description: "Role name", required: true })
    @IsNotEmpty()
	@MaxLength(100)
	@IsString()
    name: string;
}

export class UpdateRoleDto {
	@ApiProperty({ description: "Role name", required: false })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    name?: string;
}

export class ReadRoleDto {
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

	@ApiProperty({ description: "Role name", required: false })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    name?: string;
}