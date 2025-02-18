
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "src/user/domain/user.entity";
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