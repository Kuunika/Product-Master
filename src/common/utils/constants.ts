import { config } from 'dotenv';

config();

//TODO: Implement the rest of the envs into the const file.
//OCL_BASE_URL
//OCL_MASTER_REPO
//OCL_API_TOKEN
//PRODUCT_MASTER_API_VERSION

export const dhamisLocalFile = process.env.DHMIS_LOCAL_FILE;
export const openlmisLocalFile = process.env.OPENLMIS_LOCAL_FILE;