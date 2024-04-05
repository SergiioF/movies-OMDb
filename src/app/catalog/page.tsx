'use client';
import React from 'react';
import { CatalogList, ErrorMessage, Filter, SearchBar } from './components';
import { useCatalog } from './hooks';
import { useSearchParams } from 'next/navigation';

const options = [
  { label: 'Películas', value: 'movie' },
  { label: 'Series', value: 'series' },
];

const Catalog = () => {
  const searchParams = useSearchParams();
  const queries = new URLSearchParams(searchParams);

  const search = queries.get('search') || '';

  const {
    handleSearch,
    handleFilterChange,
    handleItemClick,
    yearOptions,
    data,
    loading,
    error,
  } = useCatalog(search);

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <h1 className='text-center my-8 text-4xl font-bold'>OMDB API</h1>

      <div className='container mx-auto px-4'>
        <div className='mb-6'>
          <SearchBar onSearch={handleSearch} defaultValue={search} />
          <span>Resultados encontrados: {data.length}</span>
        </div>
        <div className='mb-6 flex justify-start space-x-4'>
          <Filter
            label='Año'
            options={yearOptions}
            onChange={(year) => handleFilterChange('year', year)}
          />
          <Filter
            label='Categoría'
            options={options}
            onChange={(type) => handleFilterChange('type', type)}
          />
        </div>
        {loading && <p className='text-center text-lg'>Buscando...</p>}
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <CatalogList items={data} onClick={handleItemClick} />
        )}
      </div>
    </div>
  );
};

export default Catalog;
