import React from 'react';

type FilterProps = {
  label: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
};

export const Filter: React.FC<FilterProps> = ({ label, options, onChange }) => {
  return (
    <div className='flex items-center gap-2'>
      <label className='font-medium'>{label}: </label>
      <select
        onChange={(e) => onChange(e.target.value)}
        defaultValue=''
        className='border rounded p-2 shadow cursor-pointer'
      >
        <option value=''>Todos</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
