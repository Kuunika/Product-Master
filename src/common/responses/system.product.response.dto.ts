import { ApiProperty } from "@nestjs/swagger";

export class SystemProductResponseDto {
    @ApiProperty()
    systemName: string;

    @ApiProperty()
    systemProductCode: string;

    @ApiProperty()
    productName: string;
}