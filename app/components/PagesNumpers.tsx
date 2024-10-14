"use client";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import React, { useState } from 'react';
import Tooltip from "./Tooltip";
import Link from "next/link";

interface PagesNumbersProps {
  totalPages?: number;
  currentPage?: number;
  pageUrl:string;
}

const PagesNumbers: React.FC<PagesNumbersProps> = ({ totalPages = 0, currentPage = 1, pageUrl }) => {
 
 
  const maxVisiblePages = 5;

  // Hover states for tooltips
  const [displayToolTipPrevious, setDisplayToolTipPrevious] = useState<boolean>(false);
  const [displayToolTipNext, setDisplayToolTipNext] = useState<boolean>(false);

  const handleMouseEnterPrevious = () => setDisplayToolTipPrevious(true);
  const handleMouseLeavePrevious = () => setDisplayToolTipPrevious(false);

  const handleMouseEnterNext = () => setDisplayToolTipNext(true);
  const handleMouseLeaveNext = () => setDisplayToolTipNext(false);

  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Adjust startPage if we're at the end and we can't show a full range
  const adjustedStartPage = Math.max(1, Math.min(startPage, totalPages - maxVisiblePages + 1));

  return (
    <div className="  flex space-x-2 gap-2 justify-center items-center py-10 font-bold">
      
      <div 
        className="relative  z-12 transition-all duration-200"
        onMouseEnter={handleMouseEnterPrevious}
        onMouseLeave={handleMouseLeavePrevious}
      >
        <Tooltip message="Previous Chapter" display={displayToolTipPrevious} />

        {currentPage > 1 ? (
          <Link href={`/${pageUrl}/${currentPage - 1}`}>
            <div className="flex justify-center items-center rounded-xl mx-2 bg-gray-900 w-10 h-10 hover:shadow-lg hover:shadow-sky-500 hover:bg-sky-700 hover:justify-end hover:text-neutral-900 hover:px-2 transform scale-90 md:scale-100 transition-all duration-500 ease-out">
              <SlArrowLeft className="text-xl" />
            </div>
          </Link>
        ) : (
          <div className="flex justify-center items-center rounded-xl mx-2 bg-red-800 w-10 h-10 hover:shadow-lg hover:shadow-red-800 hover:bg-gray-900 hover:justify-end hover:px-2 transform scale-90 md:scale-100 transition-all duration-500 ease-out">
            <SlArrowLeft className="text-xl" />
          </div>
        )}
      </div>

      {/* Page Numbers */}
      {Array.from({ length: endPage - adjustedStartPage + 1 }, (_, i) => {
        const pageNumber = adjustedStartPage + i;
        return (
        <Link
          key={i}
          href={`/${pageUrl}/${i + 1}`}
          className={`flex justify-center items-center rounded-xl mx-2 w-10 h-10 transition-all duration-300 ease-out ${
            i + 1 === currentPage ? 'bg-sky-700 text-neutral-900' : 'bg-gray-900 hover:shadow-lg hover:shadow-sky-500 hover:bg-sky-700 hover:text-neutral-900'
          }`}
        >
          {i + 1}
        </Link>
      );
    })}

      <div
        className="relative z-12"
        onMouseEnter={handleMouseEnterNext}
        onMouseLeave={handleMouseLeaveNext}
      >
        <Tooltip message="Next Chapter" display={displayToolTipNext} />

        {currentPage < totalPages ? (
          <Link href={`/${pageUrl}/${currentPage + 1}`}>
            <div className=" flex justify-center items-center rounded-xl mx-2 bg-gray-900 w-10 h-10 hover:shadow-lg hover:shadow-sky-500 hover:bg-sky-700 hover:justify-start hover:text-neutral-900 hover:px-2 transform scale-90 md:scale-100 transition-all duration-500 ease-out">
              <SlArrowRight className="text-xl" />
            </div>
          </Link>
        ) : (
          <div className="flex justify-center items-center rounded-xl mx-2 bg-red-800 w-10 h-10 hover:shadow-lg hover:shadow-red-800 hover:bg-gray-900 hover:justify-start hover:px-2 transform scale-90 md:scale-100 transition-all duration-500 ease-out">
            <SlArrowRight className="text-xl" />
          </div>
        )}
      </div>

    </div>
  );
};

export default PagesNumbers;
