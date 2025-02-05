import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateCategoryProductDto } from '../domain/dto/create-category-product.dto';
import { UpdateCategoryProductDto } from '../domain/dto/update-category-product.dto';
import { CategoryProductService } from './category-product.service';

@Controller('category')
export class CategoryProductController {
  constructor(private readonly categoryProductService: CategoryProductService) {}

  @Post()
  create(@Body() createCategoryProductDto: CreateCategoryProductDto) {
    return this.categoryProductService.create(createCategoryProductDto);
  }

  @Get()
  findAll() {
    return this.categoryProductService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.categoryProductService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateCategoryProductDto: UpdateCategoryProductDto) {
    return this.categoryProductService.update(id, updateCategoryProductDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.categoryProductService.remove(id);
  }
}
