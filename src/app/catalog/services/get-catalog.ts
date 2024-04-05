import axiosGet from '@/app/utils/axiosBase';
import { Movie, SearchParams } from '../types';
import { ApiResponse } from '@/app/types';

export const getCatalog = async (
  params: SearchParams,
): Promise<Movie[]> => {
  const query = {
    apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
    s: params.title,
    y: params.year || '',
    type: params.type || '',
  };
  const response = await axiosGet<ApiResponse>('/', query);

  if (response.Response) {
    return response.Search; 
  } else {
    throw new Error(
      response.Error || 'No se encontraron películas ni series con esos criterios.',
    );
  }
};
