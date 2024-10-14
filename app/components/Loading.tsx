import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <div className="absolute top-0 left-0 h-full w-full border-4 border-transparent rounded-full border-opacity-20"></div>
      </div>
    </div>
  );
};

export default Spinner;
