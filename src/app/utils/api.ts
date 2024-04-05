// import { SearchDetailResponse } from '../movies/types';
// import { SearchParams } from '../movies/types/movie';
// import { ApiResponse } from '../types';
// import { axiosInstance } from './axiosInstance';
// import { axiosInterceptor } from './interceptors';

// const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

// axiosInterceptor();

// export const axiosFetchByTitle = async ({
//   title,
//   year,
//   type,
// }: SearchParams): Promise<ApiResponse> => {
//   console.log({title, year, type})
//   try {
//     let url = `/?apikey=${API_KEY}&s=${title}`;
//     if (year) url += `&y=${year}`;
//     if (type) url += `&type=${type}`;
//     // const { data } = await axiosInstance.get<ApiResponse>(
//     //   `/?apikey=${API_KEY}&s=${title}&type=movie`,
//     // );
//     console.log(url)
//     const { data } = await axiosInstance.get<ApiResponse>(url);
//     console.log(data)
//     return data;
//   } catch (error) {
//     console.error('Error fetching data: ', error);
//     throw error;
//   }
// };

// export const axiosFetchByID = async (
//   params: SearchParams,
// ): Promise<SearchDetailResponse> => {
//   try {
//     const { data } = await axiosInstance.get<SearchDetailResponse>( // verificar si sigue siendo ApiResponse
//       `/?apikey=${API_KEY}&i=${params}`,
//     );
//     return data;
//   } catch (error) {
//     console.error('Error fetching data: ', error);
//     throw error;
//   }
// };
