import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { IResponse } from 'src/types';
import { AuthService } from './auth.service';
import { DataDTO, LoginBodyDTO } from './dtos';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(200)
  async login(@Body() loginBody: LoginBodyDTO): Promise<IResponse<DataDTO>> {
    const data = await this.authService.login(loginBody);
    const message = `Welcome, ${data.username}!`;

    return { data, message };
  }
}
