'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { CatalogDetails } from '../types';
import { getDataById } from '../services';
import { Button } from '../components/Button';

interface DetailPageProp {
  params: {
    itemID: string;
  };
}

const CatalogDetailsPage: React.FC<DetailPageProp> = ({ params }) => {
  const router = useRouter();
  const { itemID } = params;
  const [catalogDetails, setCatalogDetails] = useState<CatalogDetails | null>(
    null,
  );

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!itemID || Array.isArray(itemID)) return;
      const details = await getDataById(itemID);
      setCatalogDetails(details);
    };

    fetchMovieDetails();
  }, [itemID]);

  if (!catalogDetails)
    return <div className='container mx-auto p-4 text-center'>Cargando...</div>;

  return (
    <div className='container mx-auto p-4'>
      <Button
        onClick={() => router.back()}
        className='mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Volver atrás
      </Button>
      <div className='flex flex-col items-center bg-gray-100 p-6 rounded shadow'>
        <Image
          src={catalogDetails.Poster}
          alt={`Poster de ${catalogDetails.Title}`}
          className='mb-4'
          width={340}
          height={500}
        />
        <h1 className='text-3xl font-bold mb-2'>{catalogDetails.Title}</h1>
        <p className='text-xl mb-2'>Rating: {catalogDetails.imdbRating}</p>
        <p className='mb-2'>{catalogDetails.Plot}</p>
        <p>
          <strong>Director:</strong> {catalogDetails.Director}
        </p>
        <p>
          <strong>Actores:</strong> {catalogDetails.Actors}
        </p>
      </div>
    </div>
  );
};

export default CatalogDetailsPage;
