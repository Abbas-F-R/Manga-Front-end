import React from 'react';

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message = "Something went wrong!" }) => {
  return (
    <div className="grid grid-rows-3 justify-items-center h-screen  px-4 py-4">
      <div className="flex flex-col items-center bg-black p-6 rounded-xl shadow-lg max-w-60 min-w-60 min-h-64 shadow-red-700 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-red-500 mb-4 transition-transform duration-300 transform hover:scale-110"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="16" x2="12" y2="16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <h1 className="text-3xl font-semibold text-red-500 mb-2">Error</h1>
        <p className="text-gray-600 text-center">{message}</p>
        <button
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none transition-colors duration-300"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
