import { ApiProperty } from "@nestjs/swagger";

export class ProductsQuery {
  @ApiProperty()
  page: number;

  @ApiProperty({ required: false })
  pageSize?: number;
}