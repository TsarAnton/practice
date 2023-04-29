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
} from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ description: "User login", nullable: false })
    @IsNotEmpty()
	@MaxLength(100)
	@IsString()
    login: string;

	@ApiProperty({ description: "User password", nullable: false })
    @IsNotEmpty()
	@MaxLength(255)
	@IsString()
    password: string;

	@ApiProperty({ description: "User roles", nullable: false })
	@IsNotEmpty()
    @IsDefined()
	@IsArray()
	@IsInt({ each: true })
    roles: number[];
}

export class UpdateUserDto {
	@ApiProperty({ description: "User login", nullable: true })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    login?: string;

	@ApiProperty({ description: "User password", nullable: true })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    password?: string;

	@ApiProperty({ description: "User roles", nullable: true })
    @IsOptional()
	@IsDefined()
	@IsArray()
	@IsInt({ each: true })
    roles?: number[];
}

export class ReadUserDto {
	@ApiProperty({ description: "User login", nullable: true })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    login?: string;

	@ApiProperty({ description: "User password", nullable: true })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    password?: string;
}