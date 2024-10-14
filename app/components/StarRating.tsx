'use client';
import { useState } from 'react';
import { useAddRateMutation } from '../Redux/features/Api/RateApi';
import Error from './Error';
import ErrorNotification from './ErrorNotification';

interface StarRatingProps {
  mangaId: string;
  rating?: number;
  onRatingChange: (rating: number) => void;
  totalStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ mangaId, rating = 0, onRatingChange, totalStars = 5 }) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [addRate, { isLoading, isError, error }] = useAddRateMutation();

  const handleMouseEnter = (index: number) => setHoveredRating(index + 1);
  const handleMouseLeave = () => setHoveredRating(null);
  const handleClick = async (index: number) => {
    const newRating = index + 1;
    onRatingChange(newRating);

    try {
      await addRate({
        rateNumber: newRating,
        mangaId: mangaId,
      }).unwrap();  // Ensure the promise is properly awaited
      setHoveredRating(null);  // Clear hovered rating on successful submission
    } catch (err) {
      console.error("Error in mutation:", (err as any).data?.message || "An unknown error occurred");
    }
  };

  const isFilled = (index: number) => index < Math.floor(rating) + (rating % 1 >= 0.5 ? 1 : 0);
  const isHalfFilled = (index: number) => index === Math.floor(rating) && rating % 1 >= 0.5;
  const isHovered = (index: number) => index < (hoveredRating ?? rating);

  return (
    <div className="flex items-center">
      {Array.from({ length: totalStars }, (_, index) => (
        <Star
          key={index}
          filled={isHovered(index)}
          halfFilled={isHalfFilled(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        />
      ))}
      {isLoading && <div className="text-blue-500">Loading...</div>}
      {isError && <ErrorNotification message={(error as any).data?.message || "An unknown error occurred"} showError={isError} />}
    </div>
  );
};

interface StarProps {
  filled: boolean;
  halfFilled: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const Star: React.FC<StarProps> = ({ filled, halfFilled, onMouseEnter, onMouseLeave, onClick }) => (
  <svg
    className={`w-6 h-6 cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    xmlns="http://www.w3.org/2000/svg"
    fill={halfFilled ? 'url(#half)' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    <defs>
      <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z"
    />
  </svg>
);

export default StarRating;
