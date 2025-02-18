import { PrismaService } from 'src/prisma/prisma.service';
import { OrderDetailRepository } from '../domain/order-detail.repository';
import { OrderDetail } from '../domain/order-detail.entities';
import { CreateOrderDetailDto, UpdateOrderDetailDto } from './dto';
import { OrderDetail as PrismaOrderDetail } from '@prisma/client';
import { InternalServerErrorException } from '@nestjs/common';

export class OrderDetailRepositoryImpl implements OrderDetailRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async find(orderId: number): Promise<OrderDetail[]> {
    try {
      const orders = await this.prismaService.orderDetail.findMany({
        where: { orderId },
      });
      return orders.map(c=> this.mapperToEntity(c));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear un detalle pedido')
    }
  }
  async create(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail> {
    try {
        const order = await this.prismaService.orderDetail.create({data: createOrderDetailDto})

        return this.mapperToEntity(order);
    } catch (error) {
        throw new InternalServerErrorException(error)
    }
  }
  update(updateOrderDetailDto: UpdateOrderDetailDto): Promise<OrderDetail> {
    throw new Error('Method not implemented.');
  }

  private mapperToEntity(order: PrismaOrderDetail):OrderDetail {
    return{
        ...order,
        price: Number(order.price),
        discount: Number(order.discount),
        subtotal: Number(order.subtotal)
    }
  }
}
