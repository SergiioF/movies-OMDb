import React from 'react';

export interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  className = '',
  children,
}) => {

  return (
    <button className={className} onClick={onClick} >
      {children}
    </button>
  );
};
