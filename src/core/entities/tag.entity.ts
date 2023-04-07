import { 
	Column, 
	Table, 
	BelongsToMany,
	DataType,
	Model,
} from 'sequelize-typescript';
import { Meetup } from './meetup.entity';
import { ApiProperty } from '@nestjs/swagger';


@Table({ tableName: 'tags', paranoid: true })
export class Tag extends Model<Tag> {
	@ApiProperty({ description: "Tag identifier", nullable: false })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ApiProperty({ description: "Tag name", nullable: false })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string;

	@ApiProperty({ description: "Tag meetups", nullable: false })
	@BelongsToMany(
		() => Meetup,
		"meetups_to_tags",
		"tag_id",
		"meetup_id",
	)
	meetups: Meetup[];
}