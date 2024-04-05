import axiosGet from '@/app/utils/axiosBase';
import { CatalogDetails } from '../types';

export const getDataById = async (
  id: string,
): Promise<CatalogDetails> => {
  const queryParams = {
    apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
    i: id,
  };
  return axiosGet<CatalogDetails>('/', queryParams);
};
