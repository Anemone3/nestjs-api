import { JpaRepository } from 'src/utils/JpaRepository';
import { CreateProductDto, UpdateProductDto } from '../infrastructure/dto';
import { Product } from './product.entity';
import { PaginationDto } from '../infrastructure/dto/pagination-product.dto';

export interface ProductRepository extends JpaRepository<Product, string, CreateProductDto, UpdateProductDto> {
  paginationProduct(paginationDto: PaginationDto): Promise<{ products: Product[] , result: number,totalPage: number}>;
}
