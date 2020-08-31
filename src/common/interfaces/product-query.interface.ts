import { ApiProperty } from "@nestjs/swagger";

export class ProductQuery {
  @ApiProperty({ required: false })
  system?: string;
}