import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartPrismaRepositoryImpl } from '../infrastructure/cart.prisma.repository';

@Module({
  controllers: [CartController],
  providers: [CartService, { provide: 'CartRepository', useClass: CartPrismaRepositoryImpl }],
})
export class CartModule {}
