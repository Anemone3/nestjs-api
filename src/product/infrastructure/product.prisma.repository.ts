import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductRepository } from '../domain/product.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product as ProductPrisma, Category as CategoryPrisma, ProductSize, Prisma } from '@prisma/client';
import { Product } from '../domain/product.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
} from '@nestjs/common';
import slugify from 'slugify';

type ProductWithRelations = ProductPrisma & {
  categories?: CategoryPrisma[];
  availableSizes: ProductSize[];
};

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  private logger: LoggerService = new Logger();

  constructor(private readonly prismaService: PrismaService) {}

  async save(createDto: CreateProductDto): Promise<Product> {
    const { categories, sizes, ...productInsert } = createDto;

    try {
      const product = await this.prismaService.product.create({
        data: {
          ...productInsert,
          slug: slugify(productInsert.name, { lower: true, replacement: '_' }),
          categories: {
            connectOrCreate: categories.map(categoryName => ({
              where: {
                name: categoryName,
              },
              create: {
                name: categoryName,
              },
            })),
          },
          availableSizes: {
            create: sizes.map(s => ({
              price: s.price,
              size: s.size,
              stock: s.stock,
            })),
          },
        },
        include: {
          categories: true,
          availableSizes: true,
        },
      });

      return this.mapToEntity(product);
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(createDto.name);

        if (error.meta && error.meta.target === 'Product_name_key') {
          throw new ConflictException('Ya existe un producto con ese nombre.');
        }
        if (error.meta && error.meta.target === 'Product_images_key') {
          throw new ConflictException('Ya existe un producto con esa imagen.');
        }
        if (error.meta && error.meta.target === 'Category_name_key') {
          throw new ConflictException('Ya existe un producto con la misma categoria relacioanda');
        }

        console.log(error.meta.target);

        throw new ConflictException('Error de clave única: alguno de los campos ya existe.');
      }
      this.logger.log(error);
      throw new InternalServerErrorException('Error al crear producto, check logger');
    }
  }

  update(id: string, updateDto: UpdateProductDto): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({
      include: {
        availableSizes: true,
        categories: true,
      },
    });
    return products.map(product => this.mapToEntity(product));
  }

  private mapToEntity(model: ProductWithRelations): Product {
    return {
      id: model.id,
      name: model.name,
      price: Number(model.price),
      slug: model.slug!,
      description: model.description || 'Sin descripción',
      categories: model.categories || [],
      images: model.images || 'No hay imagenes.',
      availableSizes:
        model.availableSizes?.map(size => ({
          size: size.size,
          stock: size.stock,
          price: Number(size.price),
          productId: size.productId,
        })) || [],
      recetas: Array.isArray(model.recetas) ? model.recetas.map(rec => String(rec)) : [],
    };
  }
}
