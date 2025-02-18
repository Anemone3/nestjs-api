import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  limit: number;

  @IsOptional()
  page: number;


  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
  category?: string[];
}
