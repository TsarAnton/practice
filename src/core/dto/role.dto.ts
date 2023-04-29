import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateRoleDto {
	@ApiProperty({ description: "Role name", nullable: false })
    @IsNotEmpty()
	@MaxLength(100)
	@IsString()
    name: string;
}

export class UpdateRoleDto {
	@ApiProperty({ description: "Role name", nullable: true })
    @IsOptional()
	@MaxLength(100)
	@IsString()
    name?: string;
}