import { 
	Column, 
	Table, 
	BelongsToMany,
	DataType,
	Model,
} from 'sequelize-typescript';
import { Meetup } from './meetup.entity';


@Table({ tableName: 'tags', paranoid: true })
export class Tag extends Model<Tag> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string;

	@BelongsToMany(
		() => Meetup,
		"meetups_to_tags",
		"tag_id",
		"meetup_id",
	)
	meetups: Meetup[];
}