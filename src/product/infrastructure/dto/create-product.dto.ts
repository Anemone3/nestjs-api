import { IsArray, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';
import { ProductSize } from 'src/product/domain/product-size.entities';


export class ProductSizeDto extends OmitType(ProductSize, ['productId'] as const) {
  @IsString()
  size: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;
}


export class CreateProductDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;


  @IsString()
  @IsOptional()
  images?: string;


  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(()=> ProductSizeDto)
  sizes: ProductSizeDto[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  recetas?: string[];


  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Type(()=> String)
  categories: string[];
}
