import * as dotenv from 'dotenv';
import { AxiosRequestConfig } from 'axios';

dotenv.config();

export const apiConfig: AxiosRequestConfig = {
    baseURL: `${process.env.BASE_URL}`,
    responseType: 'json',
    headers:{
        'Authorization': 'Token 309cfade009ec48fe585f3336309d009986ec74d',
        'Content-Type': 'application/json'
    },
    timeout: 60000,
}