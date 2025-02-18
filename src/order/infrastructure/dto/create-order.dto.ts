import { IsEnum } from "class-validator";
import { StatusOrder } from "src/order/domain/order.entities";


export class CreateOrderDto{



      customerId: number;
      total: number;
      paymentId: string;



      @IsEnum(StatusOrder)
      status: string;
}