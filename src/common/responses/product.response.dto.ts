import { ApiProperty } from "@nestjs/swagger";
import { SystemProductResponseDto } from "./system.product.response.dto";

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