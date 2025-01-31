import { CreateProductDto, UpdateProductDto } from '../domain/dto';
import { ProductRepository } from '../domain/product.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product as ProductPrisma } from '@prisma/client';
import { Product } from '../domain/product.entity';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  save(createDto: CreateProductDto): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  update(id: String, updateDto: UpdateProductDto): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<Product> {
    try {
      const product = this.prismaService.product.delete({
        where: {
          id: id,
        },
      });
      return product;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  async findById(id: string): Promise<Product> {
    try {
      const product = await this.prismaService.product.findUnique({
        where: {
          id: id,
        },
      });

      if (!product) throw new NotFoundException(`Product not found with id ${id}`);
      return this.mapToProduct(product);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  findAll(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }

  private mapToProduct(product: ProductPrisma): Product {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
    };
  }
}
