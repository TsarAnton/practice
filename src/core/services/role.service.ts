import { Injectable, Inject } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { CreateRoleDto } from '../dto/role.dto';
import { UpdateRoleDto } from '../dto/role.dto';

import { defaultPagination } from '../types/constants/pagination.constants';
import { defaultSorting } from '../types/constants/sorting.constants';

import { IRoleOptions } from '../types/role-options';

@Injectable()
export class RoleService {
  constructor(
    @Inject("ROLES_REPOSITORY")
    private roleRepository: typeof Role,
  ) {}

  public async readAll(): Promise<Role[]> {
    return await this.roleRepository.findAll();
  }

  public async readAllBy(
    options: IRoleOptions,
  ): Promise<Role[]> {
    const pagination = options.pagination === undefined ? defaultPagination : options.pagination;
    const sorting = options.sorting === undefined ? defaultSorting : options.sorting;

    return await this.roleRepository.findAll({
      where: options.filter,
      limit: pagination.size,
      offset: pagination.offset,
      order: [[sorting.column, sorting.direction]],
    });
  }

  public async readById(id: number): Promise<Role> {
    return await this.roleRepository.findOne({
      where: { id } 
    });
  }

  public async create(role: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.create(role);
  }

  public async update(
    id: number,
    role: UpdateRoleDto,
  ): Promise<Role> {
    return [... await this.roleRepository.update(
			role,
			{
				where: { id },
				returning: true,
			}
		)][1][0];
  }

  public async delete(id: number): Promise<void> {
    await this.roleRepository.destroy({
      where: { id }
    });
  }
}