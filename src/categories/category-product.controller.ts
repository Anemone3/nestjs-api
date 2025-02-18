import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoryProductService } from './category-product.service';
import { CreateCategoryProductDto, UpdateCategoryProductDto } from './domain/dto';

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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryProductDto: UpdateCategoryProductDto) {
    return this.categoryProductService.update(id, updateCategoryProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryProductService.remove(id);
  }
}
