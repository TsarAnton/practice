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

export class CreateMeetupDto {
    @IsNotEmpty()
	@MaxLength(100)
	@IsString()
    login: string;

    @IsNotEmpty()
	@MaxLength(255)
	@IsString()
    password: string;

    @IsDefined()
	@IsArray()
	@IsInt({ each: true })
    roleIds: number[];
}

export class UpdateMeetupDto {
    @IsNotEmpty()
	@MaxLength(100)
	@IsString()
    login: string;

    @IsNotEmpty()
	@MaxLength(100)
	@IsString()
    password: string;

    @IsDefined()
	@IsArray()
	@IsInt({ each: true })
    roleIds: number[];
}