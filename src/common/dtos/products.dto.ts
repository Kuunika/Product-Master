import { ProductDto } from "./product.dto";

export interface ProductsDto {
  page: number,
  totalPages: number,
  pageSize: number,
  products: ProductDto[]
}