import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	MaxLength,
} from 'class-validator';

export class AuthDto {
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
}