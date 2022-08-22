import React from 'react';

const IconDelete = ({ colorStroke = '#CF2A2B' }: { colorStroke?: string }) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4.5 5V22H19.5V5H4.5Z' stroke={colorStroke} strokeWidth='2' strokeLinejoin='round' />
      <path
        d='M10 10V16.5'
        stroke={colorStroke}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14 10V16.5'
        stroke={colorStroke}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2 5H22'
        stroke={colorStroke}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8 5L9.6445 2H14.3885L16 5H8Z'
        stroke={colorStroke}
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default IconDelete;
