import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCartDto {
  @IsUUID()
  productId: string;
  @IsString()
  size: string;
}
