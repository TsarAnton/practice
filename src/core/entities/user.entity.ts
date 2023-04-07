import {
	Column,
	Table,
	BelongsToMany,
	DataType,
	Model,
} from 'sequelize-typescript';
import { Role } from './role.entity';

@Table({ tableName: 'users', paranoid: true })
export class User extends Model<User> {
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
	login: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string;

	@BelongsToMany(
		() => Role,
		"users_to_roles",
		"user_id",
		"role_id",
	)
	roles: Role[];
}