import { JpaRepository } from "src/utils/JpaRepository";
import { CreateProductDto, UpdateProductDto } from "./dto";
import { Product } from "./product.entity";


export interface ProductRepository extends JpaRepository<Product, String,CreateProductDto,UpdateProductDto> {

}