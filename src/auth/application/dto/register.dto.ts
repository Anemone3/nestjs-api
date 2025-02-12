import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto{

  @IsString()
  firstname: string;
  @IsString()
  lastname: string;
  @IsEmail()
  email: string;
  @MinLength(3)
  password: string;
  @IsOptional()
  profile?: string;

}