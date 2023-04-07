import {
	IsNotEmpty,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateRoleDto {
    @IsNotEmpty()
	@MaxLength(100)
	@IsString()
    name: string;
}

export class UpdateRoleDto {
    @IsNotEmpty()
	@MaxLength(100)
	@IsString()
    role: string;
}