import { Controller, Request, Post, UseGuards, Body, NotFoundException, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../dto/auth.dto';

@ApiTags('Authorization')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
    ) {}

  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Authorize user with login and password" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success"})
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  async login(@Body() user: AuthDto) {
    const token = await this.authService.validateUser(user.login, user.password);
    if(token == null) {
      throw new NotFoundException(`Incorrect login or password`);
    }
    return this.authService.login(token);
  }
}