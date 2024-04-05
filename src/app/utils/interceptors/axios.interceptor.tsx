import { axiosInstance } from '../axiosInstance';
import { getValidationError } from '../get-validation-error';

export const axiosInterceptor = () => {
  axiosInstance.interceptors.request.use((request) => {
    return request;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      const customError = getValidationError(response);
      if (customError) {
        return Promise.reject(new Error(customError.customMessage));
      }
      return response;
    },
    (error) => {
      const customError = getValidationError(error.response);
      if (customError) {
        return Promise.reject(new Error(customError.customMessage));
      }
      return Promise.reject(error);
    },
  );
};
