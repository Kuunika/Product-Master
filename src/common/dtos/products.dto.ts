import { ProductDto } from "./product.dto";

export class ProductsDto {
  page: number;
  totalNumberOfPages: number;
  totalNumberOfProducts: number;
  products: ProductDto[];
}