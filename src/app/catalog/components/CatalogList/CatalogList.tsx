'use client';
import React from 'react';
import { CatalogDetails } from '../../types';
import Image from 'next/image'

interface Props {
  items: CatalogDetails[];
  onClick: (imdbID: string) => void;
}

const getRatingBackgroundColor = (rating: string) => {
  const numericRating = parseFloat(rating);
  if (numericRating >= 7) {
    return 'bg-green-600';
  } else if (numericRating >= 4) {
    return 'bg-yellow-600';
  } else {
    return 'bg-red-600';
  }
};

export const CatalogList: React.FC<Props> = ({ items, onClick }) => (
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
    {items.map((data, index) => (
      <div
        key={data.imdbID || index}
        onClick={() => onClick(data.imdbID)}
        className='rounded overflow-hidden shadow-lg cursor-pointer bg-white'
      >
        <Image
          src={data.Poster !== 'N/A' ? data.Poster : 'placeholder-image.png'}
          alt={`Poster de ${data.Title}`}
          className='w-full h-auto'
          width={340}
          height={500}
        />
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{data.Title}</div>
          <div className='text-gray-700 text-base'>
            Rating:
            <span
              className={`rounded overflow-hidden shadow-lg cursor-pointer p-1 ${getRatingBackgroundColor(
                data.imdbRating,
              )}`}
            >
              {data.imdbRating}
            </span>
          </div>
          <p className='text-gray-700 text-base overflow-ellipsis overflow-hidden ...'>
            {data.Plot}
          </p>
        </div>
      </div>
    ))}
  </div>
);
