import { Product } from "src/product/domain/product.entity"



export type Size = {
  size: string,
  quantity: number;
  unitPrice: number;
  price: number;
}

export type ProductCart = Omit<Product, 'slug' | 'availableSizes' | 'description' | 'recetas' | 'categories'> & {
  add: Size[];
};

export class Cart {
  user: string;
  product: ProductCart[];
  totalCart: number;
}
