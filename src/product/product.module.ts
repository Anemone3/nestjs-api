import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepositoryImpl } from './infrastructure/product.prisma.repository';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryImpl,
    },
  ],
  exports: [ProductService],
})
export class ProductModule {}
