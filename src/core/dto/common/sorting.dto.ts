import { IsDefined, IsIn, IsString } from 'class-validator';
import { defaultSorting } from 'src/core/types/constants/sorting.constants';
import { ApiProperty } from '@nestjs/swagger';

export class SortingDto {
    @ApiProperty({ description: "Sorting column name", required: true })
	@IsDefined()
	@IsString()
	public column: string = defaultSorting.column;

    @ApiProperty({ description: "Sorting direction", required: true })
	@IsDefined()
	@IsIn(['DESC', 'ASC'])
	public direction: 'DESC' | 'ASC' = defaultSorting.direction;
}