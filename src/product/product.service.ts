import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './infrastructure/dto';
import { ProductRepository } from './domain/product.repository';
import { PaginationDto } from './infrastructure/dto/pagination-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async findAll() {
    return await this.productRepository.findAll();
  }

  async pagination(paginationDto: PaginationDto) {
    // if (!paginationDto.category) {
    //   return this.findAll();
    // }
    const productsPagination = await this.productRepository.paginationProduct(paginationDto);
    return {
      rows: productsPagination.products.length,
      result: productsPagination.result,
      pages: productsPagination.totalPage,
      products: productsPagination.products,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
