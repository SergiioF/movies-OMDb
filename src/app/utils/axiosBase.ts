import { axiosInstance } from './axiosInstance';
import { axiosInterceptor } from './interceptors';
axiosInterceptor();

async function axiosGet<T>(
  endpoint: string,
  params?: Record<string, any>,
): Promise<T> {
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : '';
  const response = await axiosInstance.get<T>(`${endpoint}${queryString}`);
  return response.data;
}

export default axiosGet;
