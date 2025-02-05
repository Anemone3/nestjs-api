import { JpaRepository } from "src/utils/JpaRepository";
import { CreateProductDto, UpdateProductDto } from "../infrastructure/dto";
import { Product } from "./product.entity";


export interface ProductRepository extends JpaRepository<Product, string, CreateProductDto, UpdateProductDto> {}