import { Injectable, Inject } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { CreateRoleDto } from '../dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @Inject("TAGS_REPOSITORY")
    private roleRepository: typeof Role,
  ) {}

  public async readAll(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  public async readById(id: number): Promise<Role> {
    return this.roleRepository.findOne({
      where: { id } 
    });
  }

  public async create(role: CreateRoleDto): Promise<Role> {
     return this.roleRepository.create(role);
  }

  public async update(role: CreateRoleDto): Promise<Role> {
    return this.roleRepository.create(role);
  }

  public async delete(id: number): Promise<void> {
    await this.roleRepository.destroy({
      where: { id }
    });
  }
}