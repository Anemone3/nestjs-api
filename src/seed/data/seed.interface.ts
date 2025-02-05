interface SeedProduct {
  name: string;
  price: number;
  description: string;
  images: string;
  categories: string[];
  sizes: SizeProduct[];
  recetas: string[]
}

type SizeProduct = {
  size: string;
  price: number;
  stock: number;
};

export interface SeedData {
  products: SeedProduct[];
  //... otros datos
}
