import { Injectable, Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject("MEETUPS_REPOSITORY")
    private userRepository: typeof User,
    @Inject("TAGS_REPOSITORY")
    private roleRepository: typeof Role,
  ) {}

  public async readAll(): Promise<User[]> {
    return this.userRepository.findAll({
      include: [
        {
          model: Role,
          all: true,
        }
      ]
    });
  }

  // public async readBy(filter: ReadUserDto): Promise<User[]> {
  //   return this.userRepository.findAll({
  //     where: { ...filter },
  //   });
  // }

  public async readById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  public async create(user: User): Promise<User> {
     return this.userRepository.create(user);
  }

  public async update(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  public async delete(id: number): Promise<void> {
    await this.userRepository.destroy({
      where: { id },
    });
  }
}