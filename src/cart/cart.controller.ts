import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './infrastructure/dto';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  //todo: Manejar middleware de inicio de sesion
  //! buscar la manera de evitar tocar la base de datos por cada peticion
  @Post('/:userId/increment')
  async incrementCart(@Param('userId', ParseUUIDPipe) userId: string, @Body() createCartDto: CreateCartDto) {
    const results = await this.cartService.increment(userId, createCartDto);
    return {
      action: 'increment',
      payload: results,
    };
  }

  @Post('/:userId/decrement')
  async decrementCart(@Param('userId', ParseUUIDPipe) userId: string, @Body() createCartDto: CreateCartDto) {
    return {
      action: 'decrement',
      payload: await this.cartService.increment(userId, createCartDto),
    };
  }

  @Delete('/:userId')
  clearCart(@Param('userId', ParseUUIDPipe) userId: string) {
    this.cartService.clearCart(userId);
    return {
      message: 'Cart is empty',
    };
  }
}
