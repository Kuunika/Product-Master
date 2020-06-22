import { SystemProductDto } from "./system-product.dto";

export interface ProductDto {
    productCode: string;
    productName: string;
    mappings: SystemProductDto[];
    dateCreated: Date;
    lastUpdated: Date;
}