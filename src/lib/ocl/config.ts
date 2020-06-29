import * as dotenv from 'dotenv';
import { AxiosRequestConfig } from 'axios';

dotenv.config();

export const apiConfig: AxiosRequestConfig = {
    baseURL: process.env.OCL_BASE_URL,
    responseType: 'json',
    headers:{
        'Authorization': process.env.OCL_API_TOKEN,
        'Content-Type': 'application/json'
    },
    timeout: 60000,
}