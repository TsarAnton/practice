import {
	Column,
	Table,
	BelongsToMany,
	DataType,
	Model,
} from 'sequelize-typescript';
import { Tag } from './tag.entity';

@Table({ tableName: 'meetups', paranoid: true })
export class Meetup extends Model<Meetup> {
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

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	discription: string;

    @Column({
		type: DataType.DATE,
		allowNull: false,
	})
    time: Date;

    @Column({
		type: DataType.STRING,
		allowNull: false,
	})
    place: string;

	@BelongsToMany(
		() => Tag,
		"meetups_to_tags",
		"meetup_id",
		"tag_id",
	)
	tags: Tag[];
}