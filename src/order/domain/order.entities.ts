export class Order {
  id: number;
  customerId: number;
  total: number;
  paymentId: string;
  status: StatusOrder;
}

export enum StatusOrder {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCEL = 'cancelled',
  SHIPPED = 'shipped',
}
