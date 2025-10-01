import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBodyDTO } from './dtos';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(200)
  async login(@Body() loginBody: LoginBodyDTO) {
    return await this.authService.login(loginBody);
  }
}
