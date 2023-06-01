import { ApiProperty } from '@nestjs/swagger';
import {
	IsArray,
	IsDate,
	IsDefined,
	IsInt,
	IsNotEmpty,
	IsString,
	MaxLength,
    IsOptional,
	IsObject,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SortingDto } from './common/sorting.dto';
import { PaginationDto } from './common/pagination.dto';

export class CreateUserDto {
	@ApiProperty({ description: "User login", required: true })
    @IsNotEmpty()
	@MaxLength(100)
	@IsString()
    login: string;

	@ApiProperty({ description: "User password", required: true })
    @IsNotEmpty()
	@MaxLength(255)
	@IsString()
    password: string;

	@ApiProperty({ description: "User roles", required: true })
	@IsNotEmpty()
    @IsDefined()
	@IsArray()
	@IsInt({ each: true })
    roles: number[];
}

export class UpdateUserDto {
	@ApiProperty({ description: "User login", required: false })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    login?: string;

	@ApiProperty({ description: "User password", required: false })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    password?: string;

	@ApiProperty({ description: "User roles", required: false })
    @IsOptional()
	@IsDefined()
	@IsArray()
	@IsInt({ each: true })
    roles?: number[];
}

export class ReadUserDto {
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

	@ApiProperty({ description: "User login", required: false })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    login?: string;

	@ApiProperty({ description: "User password", required: false })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    password?: string;
}