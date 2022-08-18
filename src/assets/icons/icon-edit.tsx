import React from 'react';

const IconEdit = ({
  colorStroke = 'white',
  colorFill = '#CF2A2B',
}: {
  colorStroke?: string;
  colorFill?: string;
}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' fill='white'>
      <path
        d='M3.5 21H21.5'
        stroke={colorStroke}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.5 13.36V17H9.1586L19.5 6.65405L15.8476 3L5.5 13.36Z'
        fill={colorFill}
        stroke={colorStroke}
        strokeWidth={2}
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default IconEdit;
