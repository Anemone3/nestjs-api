import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryProductDto } from '../domain/dto/create-category-product.dto';
import { UpdateCategoryProductDto } from '../domain/dto/update-category-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryProductDto: CreateCategoryProductDto) {
    try {
      const category = await this.prismaService.category.create({ data: createCategoryProductDto });

      return category;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('El producto ya existe.');
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const categories = await this.prismaService.category.findMany();

      return categories;
    } catch (error) {
      throw new InternalServerErrorException(error.message ?? 'Error en findall categories');
    }
  }

  async findOne(term: string) {
    try {
      const categories = await this.prismaService.category.findMany({ where: { name: { startsWith: term } } });
    } catch (error) {
      throw new InternalServerErrorException(error.message ?? 'Error to findOne Category');
    }
  }

  async update(id: number, updateCategoryProductDto: UpdateCategoryProductDto) {
    try {
      const categoryUpdated = await this.prismaService.category.upsert({
        where: { id },
        update: {
          name: updateCategoryProductDto.name,
        },
        create: {
          name: updateCategoryProductDto.name!,
        },
      });

      return categoryUpdated;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Category name already exists.');
      }
      if (error.code === 'P2025') {
        throw new NotFoundException('Category not found.');
      }
      throw new InternalServerErrorException('An error occurred while updating the category.');
    }
  }

  async remove(id: number) {
    try {
      const category = await this.prismaService.category.findUnique({
        where: { id: id },
      });

      if (!category) {
        throw new NotFoundException('Category not found.');
      }

      await this.prismaService.category.delete({
        where: { id: id },
      });

      return { message: 'Category deleted successfully.' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Category not found.');
      }
      throw new InternalServerErrorException('An error occurred while deleting the category.');
    }
  }
}
