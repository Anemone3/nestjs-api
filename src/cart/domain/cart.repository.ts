import { Cart } from './cart.entity';
import { CreateCartDto, UpdateCartDto } from '../application/dto';

export interface CartRepository {
  incrementCart(userId: string, createDto: CreateCartDto): Promise<Cart>;
  decrementCart(userId: string, createDto: CreateCartDto): Promise<Cart>;
  findCartUser(userId: string): Promise<Cart>;
  clearCart(userId: string): void;
}
