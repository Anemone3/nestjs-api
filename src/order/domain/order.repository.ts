import { JpaRepository } from 'src/utils/JpaRepository';
import { Order } from './order.entities';
import { CreateOrderDto, UpdateOrderDto } from '../infrastructure/dto';

export interface OrderRepository extends JpaRepository<Order, number, CreateOrderDto, UpdateOrderDto> {}
