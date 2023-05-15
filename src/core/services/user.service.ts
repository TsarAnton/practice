import { Injectable, Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/user.dto';
import { ReadUserDto } from '../dto/user.dto';
import { Role } from '../entities/role.entity';
import { RoleService } from './role.service';

import { defaultPagination } from '../types/constants/pagination.constants';
import { defaultSorting } from '../types/constants/sorting.constants';

import { IUserOptions } from '../types/user-options';

@Injectable()
export class UserService {
  constructor(
    @Inject("USERS_REPOSITORY")
    private userRepository: typeof User,
    private roleService: RoleService,
  ) {}

  public async readAll(): Promise<User[]> {
    return await this.userRepository.findAll({
      include: [
        {
          model: Role,
          all: true,
        }
      ]
    });
  }
  
  public async readAllBy(
    options: IUserOptions,
  ): Promise<User[]> {
    const pagination = options.pagination === undefined ? defaultPagination : options.pagination;
    const sorting = options.sorting === undefined ? defaultSorting : options.sorting;

    return await this.userRepository.findAll({
      where: options.filter,
      include: {
        model: Role, 
        all: true, 
      },
      limit: pagination.size,
      offset: pagination.offset,
      order: [[sorting.column, sorting.direction]],
    });
  }

  public async readBy(options: ReadUserDto): Promise<User> {
    return await this.userRepository.findOne({
      where: { ...options },
      include: [
        {
          model: Role,
          all: true,
        }
      ],
    });
  }

  public async readById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      include: [
        {
          model: Role,
          all: true,
        }
      ]
    });
  }

  public async create(user: CreateUserDto): Promise<User> {
    let newUser = new User();
    for(let prop in user) {
      newUser[prop] = user[prop];
    }
		let createdUser = await this.userRepository.create(newUser.dataValues);

		for await (const role of user.roles) {
			await createdUser.$add('roles', await this.roleService.readById(role));
		}

		return await this.readById(createdUser.id);
  }

  public async update(
    id: number,
    user: UpdateUserDto
  ): Promise<User> {
    let existingUser = await this.readById(id);
    let update = {
      login: user.login !== undefined ? user.login : existingUser.login,
      password: user.password !== undefined ? user.password : existingUser.password,
    }
		let createdUser = [... await this.userRepository.update(
      update,
      {
        where: { id },
        returning: true,
      }
    )][1][0];
    console.log(user.roles)
    if(user.roles !== undefined) {
		  for await (const role of user.roles) {
			  await createdUser.$add('roles', await this.roleService.readById(role));
		  }
    }

		return await this.readById(createdUser.id);
  }

  public async delete(id: number): Promise<void> {
    let existingUser = await this.readById(id);
    existingUser.$remove('roles', existingUser.dataValues.roles)
    await this.userRepository.destroy({
      where: { id },
    });
  }
}