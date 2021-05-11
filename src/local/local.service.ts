import { Injectable } from '@nestjs/common';
import { ProductDto } from 'src/common/dtos/product.dto';
import { dhamisLocalFile, openlmisLocalFile } from 'src/common/utils/constants';
import { nanoid } from 'nanoid';

@Injectable()
export class LocalService {
    async getProductsFromLocalFiles(): Promise<ProductDto[]> {
        const dhamis = await require(dhamisLocalFile);
        const openlmis = await require(openlmisLocalFile);

        return [
            ...dhamis.map((product): ProductDto => ({
                productCode: product["Code"] + product["Data Element ID"],
                productName: product["Data Element Short Name"],
                mappings: [{
                    productName: product["Data Element Short Name"],
                    systemName: 'DHAMIS',
                    systemProductCode: product["Code"]
                }, {
                    productName: product["Data Element Short Name"],
                    systemName: 'DHIS2',
                    systemProductCode: product["Data Element ID"]
                }],
                dateCreated: new Date(),
                lastUpdated: new Date(),
            })),
            ...openlmis.map(product => ({
                productCode: product["openlmis_code"] + product["dhis2_code"],
                productName: product["name"],
                mappings: [{
                    productName: product["name"],
                    systemName: "OpenLMIS",
                    systemProductCode: product["openlmis_code"]
                }, {
                    productName: product["name"],
                    systemName: "DHIS2",
                    systemProductCode: product["dhis2_code"]
                }],
                dateCreated: new Date(),
                lastUpdated: new Date(),
            }))
        ];
    }
}