import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto, UpdateCartDto } from '../application/dto';
import { Cart, ProductCart, Size } from '../domain/cart.entity';
import { CartRepository } from '../domain/cart.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartPrismaRepositoryImpl implements CartRepository {
  private logger: LoggerService = new Logger();

  constructor(private readonly prismaService: PrismaService) {}

  async incrementCart(userId: string, createDto: CreateCartDto): Promise<Cart> {
    const { productId, size } = createDto;
    await this.validateProperties(size, userId);
    try {
      await this.prismaService.cart.upsert({
        where: {
          userId_productId_size: {
            userId: userId,
            productId: productId,
            size: size,
          },
        },
        update: {
          quantity: {
            increment: 1,
          },
        },
        create: {
          productId,
          userId,
          quantity: 1,
          size,
        },
      });

      const cartItems = await this.findCartUser(userId);

      return cartItems;
    } catch (error) {
      this.errorHandler(error);
      this.logger.error(error);
      throw new InternalServerErrorException('Error to create a cart');
    }
  }

  async decrementCart(userId: string, createDto: CreateCartDto): Promise<Cart> {
    const { productId, size } = createDto;
    await this.validateProperties(size, userId);
    try {
      const cartUpdated = await this.prismaService.cart.update({
        where: {
          userId_productId_size: {
            userId: userId,
            productId: productId,
            size: size,
          },
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      });

      if (cartUpdated.quantity <= 0) {
        await this.prismaService.cart.delete({
          where: {
            userId_productId_size: {
              userId,
              productId,
              size,
            },
          },
        });
      }

      const cartItems = await this.findCartUser(userId);

      return cartItems;
    } catch (error) {
      this.errorHandler(error);
      this.logger.error(error);
      throw new InternalServerErrorException('Error to create a cart');
    }
  }

  async findCartUser(userId: string): Promise<Cart> {
    try {
      const resultCart = await this.prismaService.cart.findMany({
        where: { userId },
        include: {
          product: {
            select: {
              id: true,
              images: true,
              price: true,
              name: true,
              availableSizes: {
                select: {
                  size: true,
                  price: true,
                },
              },
            },
          },
        },
      });

      const cartItems = resultCart.reduce((acc: ProductCart[], item) => {
        const { product, size, quantity } = item;
        let addProduct: ProductCart | undefined;
        if (!addProduct) {
          console.log('holaa');
          addProduct = {
            id: product.id,
            images: product.images!,
            add: [],
            price: 0,
            name: product.name,
          };
          acc.push(addProduct);
        }

        const unitPrice = Number(product.availableSizes.find(s => s.size === size)?.price || 0);
        const priceTotal = unitPrice * quantity;
        let addSize: Size | undefined;

        console.log(addSize);

        addSize = { size, unitPrice: unitPrice, quantity, price: priceTotal };
        addProduct.add.push(addSize);

        addProduct.price = addProduct.add.reduce((total, sizeItem) => total + sizeItem.price * sizeItem.quantity, 0);

        return acc;
      }, []);

      return {
        user: userId,
        product: cartItems,
        totalCart: cartItems.reduce((acc, item) => acc + item.price, 0),
      };
    } catch (error) {
      this.errorHandler(error);
      this.logger.error(error);
      throw new InternalServerErrorException('Error to create a cart');
    }
  }

  async clearCart(userId: string) {
    try {
      await this.prismaService.cart.deleteMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      console.log(error);
      if (error.code === 'P2003') {
        throw new NotFoundException('User is not exits');
      }

      throw new InternalServerErrorException();
    }
  }

  private async validateProperties(size: string, userId: string) {
    const sizeExits = await this.prismaService.productSize.findFirst({ where: { size } });
    const userExists = await this.prismaService.user.findFirst({ where: { id: userId } });
    if (!userExists) {
      throw new NotFoundException('User not exists');
    }
    if (!sizeExits) {
      throw new NotFoundException('Size not exists');
    }
  }

  private errorHandler(error: any) {
    if (error.code === 'P2003') {
      if (error.meta && error.meta.field_name === 'productId') {
        throw new NotFoundException('Product not exists');
      }
    }
  }
}
