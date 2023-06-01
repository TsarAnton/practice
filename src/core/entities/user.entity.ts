import {
	Column,
	Table,
	BelongsToMany,
	DataType,
	Model,
	HasMany,
} from 'sequelize-typescript';
import { Role } from './role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Meetup } from './meetup.entity';

@Table({ tableName: 'users', paranoid: true })
export class User extends Model<User> {
	@ApiProperty({ description: "User identifier", nullable: false })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ApiProperty({ description: "User login", nullable: false })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	login: string;

	@ApiProperty({ description: "User password", nullable: false })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string;

	@ApiProperty({ description: "User roles", nullable: false })
	@BelongsToMany(
		() => Role,
		"users_to_roles",
		"user_id",
		"role_id",
	)
	roles: Role[];

	@BelongsToMany(
		() => Meetup, 
		'meetups_to_users', 
		'user_id', 
		'meetup_id'
	)
	signUpMeetups: Meetup[];

	@HasMany(() => Meetup, 'creator_id')
	meetups: Meetup[];
}