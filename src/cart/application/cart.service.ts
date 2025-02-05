import { Inject, Injectable } from '@nestjs/common';
import { CreateCartDto, UpdateCartDto } from './dto';
import { CartRepository } from '../domain/cart.repository';

@Injectable()
export class CartService {
  constructor(
    @Inject('CartRepository')
    private readonly cartRepository: CartRepository,
  ) {}

  async increment(userId: string, createCartDto: CreateCartDto) {
    return await this.cartRepository.incrementCart(userId, createCartDto);
  }

  async decrement(userId: string, createCartDto: CreateCartDto) {
    return await this.cartRepository.decrementCart(userId, createCartDto);
  }

  clearCart(userId: string) {
    return this.cartRepository.clearCart(userId);
  }
}
