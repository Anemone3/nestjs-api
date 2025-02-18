import { OrderRepository } from '../domain/order.repository';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { Order as OrderPrisma, OrderStatus } from '@prisma/client';
import { Order, StatusOrder } from '../domain/order.entities';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(createDto: CreateOrderDto): Promise<Order> {
    const { status, ...dto } = createDto;
    try {
      const order = await this.prismaService.order.create({
        data: {
          ...dto,
          status: (status as OrderStatus) || 'PENDING',
        },
      });

      return this.mappedToEntity(order);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }
  async update(id: number, updateDto: UpdateOrderDto): Promise<Order> {
    const { status, ...dto } = updateDto;

    try {
      const orderUpdated = await this.prismaService.order.update({
        where: { id },
        data: {
          ...dto,
          status: status as OrderStatus,
        },
      });

      return this.mappedToEntity(orderUpdated);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('No se pudo actualizar el customer.');
    }
  }
  async remove(id: number): Promise<void | Order> {
    try {
      const customer = await this.prismaService.order.update({
        where: { id },
        data: {
          status: 'CANCELLED',
        },
      });

      return this.mappedToEntity(customer);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }
  async findById(id: number): Promise<Order> {
    try {
      const customers = await this.prismaService.order.findUniqueOrThrow({ where: { id } });

      return this.mappedToEntity(customers);
    } catch (error) {
      console.log(error);
      if ((error.code = 'P2025')) throw new NotFoundException(`no existe un usuario con el id ${id}`);
      throw new InternalServerErrorException('No se pudo actualizar el customer.');
    }
  }
  async findAll(): Promise<Order[]> {
    return (await this.prismaService.order.findMany()).map(c => this.mappedToEntity(c));
  }

  private mappedToEntity(prisma: OrderPrisma): Order {
    return {
      id: prisma.id,
      customerId: prisma.customerId,
      paymentId: prisma.paymentId,
      status: prisma.status as StatusOrder,
      total: Number(prisma.total),
    };
  }
}
