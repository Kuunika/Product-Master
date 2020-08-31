import { ApiProperty } from "@nestjs/swagger";
import { ProductResponseDto } from "./product.response.dto";

export class ProductsResponseDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  totalNumberOfPages: number;

  @ApiProperty()
  totalNumberOfProducts: number;

  @ApiProperty({ isArray: true })
  products: ProductResponseDto
}