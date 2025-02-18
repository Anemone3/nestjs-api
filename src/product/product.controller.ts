import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UpdateProductDto, CreateProductDto } from './infrastructure/dto';
import { ProductService } from './product.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Product } from './domain/product.entity';
import { PaginationDto } from './infrastructure/dto/pagination-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async findAll() {
    const products = await this.productService.findAll();

    return {
      rows: products.length,
      products,
    };
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Get()
  paginationProductByPage(@Query() paginationDto: PaginationDto) {
    return this.productService.pagination(paginationDto);
  }
}
