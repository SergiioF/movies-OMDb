import { AxiosResponse } from 'axios';

export const getValidationError = (response: AxiosResponse) => {
  if (response.data && response.data.Response === 'False') {
    return {
      customMessage: `Ha ocurrido un error al intentar realizar tu solicitud. API ERROR: ${response.data.Error}`,
    };
  }
  return null;
};
