import { ApiProperty } from "@nestjs/swagger";

export class ProductsQuery {
  @ApiProperty({ nullable: true })
  page?: number;

  @ApiProperty({ nullable: true })
  pageSize?: number;

  @ApiProperty({ nullable: true })
  name?: string;
}