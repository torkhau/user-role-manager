import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginBodyDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}