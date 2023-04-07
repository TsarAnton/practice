import { 
	Column, 
	Table, 
	BelongsToMany,
	DataType,
	Model,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table({ tableName: 'roles', paranoid: true })
export class Role extends Model<Role> {
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
		() => User,
		"users_to_roles",
		"role_id",
		"user_id",
	)
	users: User[];
}