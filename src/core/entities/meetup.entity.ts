import {
	Column,
	Table,
	BelongsToMany,
	DataType,
	Model,
} from 'sequelize-typescript';
import { Tag } from './tag.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'meetups', paranoid: true })
export class Meetup extends Model<Meetup> {
	@ApiProperty({ description: "Meetup identifier", nullable: false })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ApiProperty({ description: "Meetup name", nullable: false })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string;

	@ApiProperty({ description: "Meetup description", nullable: false })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	description: string;

	@ApiProperty({ description: "Meetup start time", nullable: false })
    @Column({
		type: DataType.DATE,
		allowNull: false,
	})
    time: Date;

	@ApiProperty({ description: "Meetup place", nullable: false })
    @Column({
		type: DataType.STRING,
		allowNull: false,
	})
    place: string;

	@ApiProperty({ description: "Meetup flags", nullable: false })
	@BelongsToMany(
		() => Tag,
		"meetups_to_tags",
		"meetup_id",
		"tag_id",
	)
	tags: Tag[];
}