import { Role } from "../user.entity";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
export class CreateUserDto {
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
  @IsOptional()
  role?: Role;
}