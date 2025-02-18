import { IsString, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @MinLength(3)
  address: string;
  @IsString()
  @MinLength(9)
  phone: string;
  @IsString()
  @MinLength(3)
  departamento: string;
}
