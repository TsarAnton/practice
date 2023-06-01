import { Injectable } from '@nestjs/common';
import { UserService } from 'src/core/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private JwtService: JwtService,
    private userService: UserService,
    ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = (await this.userService.readBy({ login, password })).dataValues;
    if(user === null) {
      return null;
    }
    const roles = [];
    for(let role of user.roles) {
        roles.push(role.name);
    }
    if (user && user.password === password) {
      const result = {
        id: user.id,
        login: user.login,
        roles: roles,
      }
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
        id: user.id,
        login: user.login,
        roles: user.roles,
    };
    return {
        access_token: this.JwtService.sign(payload),
    };
  }
}