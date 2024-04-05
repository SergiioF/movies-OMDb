'use client';
import React, { FC, useState, KeyboardEvent } from 'react';
import { Button } from '../Button';

type Props = {
  defaultValue: string | null;
  onSearch: (title: string) => void;
};

export const SearchBar: FC<Props> = ({ onSearch, defaultValue }) => {
  const [title, setTitle] = useState(defaultValue || '');

  const handleSearch = () => {
    onSearch(title.trim());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className=' justify-center items-center'>
      <div className='flex items-center p-2 gap-2'>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Buscar por título...'
          className='flex-1 p-2 border rounded shadow'
        />
        <Button
          onClick={handleSearch}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Buscar
        </Button>
      </div>
    </div>
  );
};
