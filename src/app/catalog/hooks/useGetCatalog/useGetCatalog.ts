import { useState } from 'react';
import { SearchParams, CatalogDetails } from '../../types';
import { getCatalog, getDataById } from '../../services';

export const useGetCatalog = () => {
  const [data, setData] = useState<CatalogDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchCatalog = async (params: SearchParams) => {
    setLoading(true);
    setData([]);
    setError('');
    try {
      const searchResults = await getCatalog(params);
      const detailedCatalog = await Promise.all(
        searchResults.map(async (movie) => {
          return await getDataById(movie.imdbID);
        }),
      );
      setData(detailedCatalog);
    } catch (error: any) {
      if (error.message.includes('Series not found')) {
        setError('No se encontraron series.');
      } else if (error.message.includes('Movie not found')) {
        setError('No se encontraron peliculas.');
      } else {
        setError(error.message || 'Ocurrió un error durante la búsqueda.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, searchCatalog };
};
