import { ApiProperty } from "@nestjs/swagger";

class SystemProductResponseDto {
  @ApiProperty()
  systemName: string;

  @ApiProperty()
  systemProductCode: string;

  @ApiProperty()
  productName: string;
}

export class ProductResponseDto {
    @ApiProperty()
    productCode: string;

    @ApiProperty()
    productName: string;

    @ApiProperty({ isArray: true })
    mappings: SystemProductResponseDto;

    @ApiProperty()
    dateCreated: Date;

    @ApiProperty()
    lastUpdated: Date;
}

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