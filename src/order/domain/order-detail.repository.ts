import { CreateOrderDetailDto, UpdateOrderDetailDto } from '../infrastructure/dto';
import { OrderDetail } from './order-detail.entities';

export interface OrderDetailRepository {
  find(orderId: number): Promise<OrderDetail[]>;
  create(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail>;
  update(updateOrderDetailDto: UpdateOrderDetailDto): Promise<OrderDetail>;
}
