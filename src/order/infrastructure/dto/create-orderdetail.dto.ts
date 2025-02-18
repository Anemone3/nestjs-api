

export class CreateOrderDetailDto {
    orderId: number;
    productId: string;
    description: string;
    quantity: number;
    price: number;
    subtotal: number;
}