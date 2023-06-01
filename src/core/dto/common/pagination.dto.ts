import { IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { defaultPagination } from '../../types/constants/pagination.constants';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
	@ApiProperty({ description: "Pagination page count", required: true })
	@IsInt()
	@Min(1)
	@Type(() => Number)
	public page: number = defaultPagination.page;

	@ApiProperty({ description: "Pagination page size", required: true })
	@IsInt()
	@Min(1)
	@Max(50)
	@Type(() => Number)
	public size: number = defaultPagination.size;

	get offset(): number {
		return (this.page - 1) * this.size;
	}
}