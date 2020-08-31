import { SystemProductDto } from "./system-product.dto";

export class ProductDto {
    productCode: string;
    productName: string;
    mappings: SystemProductDto[];
    dateCreated: Date;
    lastUpdated: Date;
}