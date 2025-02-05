import { CategoryProduct } from "src/categories/domain/category-product.entity";
import { ProductSize } from "./product-size.entities";

export class Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  slug: string;
  images?: string;
  availableSizes?: ProductSize[];
  categories?: CategoryProduct[];

  recetas?: string[];
}
