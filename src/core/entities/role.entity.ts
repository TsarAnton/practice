import { 
	Column, 
	Table, 
	BelongsToMany,
	DataType,
	Model,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'roles', paranoid: true })
export class Role extends Model<Role> {
	@ApiProperty({ description: "Role identifier", nullable: false })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ApiProperty({ description: "Role name", nullable: false })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string;

	@ApiProperty({ description: "Role users", nullable: false })
	@BelongsToMany(
		() => User,
		"users_to_roles",
		"role_id",
		"user_id",
	)
	users: User[];
}