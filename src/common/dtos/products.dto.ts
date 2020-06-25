import { ProductDto } from "./product.dto";

export interface ProductsDto {
  page: number,
  totalNumberOfPages: number,
  totalNumberOfProducts: number,
  products: ProductDto[]
}