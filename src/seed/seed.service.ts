import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { initialData } from './data/seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductService,
    private readonly prismaService: PrismaService,
  ) {}

  async runSeed() {
    const isDeleted = await this.seedProductsInsert();

    return isDeleted ? 'seed execute' : 'error seed';
  }

  private async seedProductsInsert(): Promise<boolean> {
    try {
      await this.prismaService.product.deleteMany();

      const seedProducts = initialData.products;

      const insertPromise: Promise<any>[] = [];
      console.log(seedProducts.length);

      seedProducts.forEach(p => {
        insertPromise.push(this.productService.create(p));
      });

      await Promise.all(insertPromise);

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }
}
