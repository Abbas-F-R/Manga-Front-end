'use client';
import React from "react";
import Link from "next/link";
import Spinner from "./Loading";
import { useGetChaptersQuery } from "../Redux/features/Api/ChapterApi";

interface ChapterListProps {
  mangaId:  string;
}

const MangaChapterList: React.FC<ChapterListProps> = ( { mangaId }) => {


  const { data: chapters, isLoading: isChaptersLoading, isError: isChaptersError, error: chaptersError } = useGetChaptersQuery(
    { mangaId: mangaId ?? '', pageNo: 1 },
    {
      skip: !mangaId
    }
  );
  
  if ( isChaptersLoading) {
    return <Spinner />;     
   }
  const data = chapters?.data;
  return (
    <div className=" max-w-6xl w-11/12 sm:w-3/5  mx-auto p-2">
      <div className=" text-white rounded-lg shadow-lg p-6 divide-y-2 divide-gray-600">
        <h1 className=" my-2 text-xl"> Latest Chapters </h1>
        <div className="flex text-center items-center justify-center min-h-[400px]">
          <div className="relative flex  h-96 w-full items-center justify-center  max-w-md min-w-md my-2 rounded-lg bg-gradient-to-br via-black from-sky-950 to-teal-900  ">
            <div className=" absolute flex  justify-center rounded-lg h-full w-full   p-4 overflow-y-auto">
              <ul className=" w-full py-6 px-4 overflow-y-auto custom-scrollbar ">
               
                {data != null 
                ? data?.map((chapter, index) => (
                  <Link
                    key={index}
                    href={`/${chapter.chapterNumber}/${chapter.id}`}
                    passHref
                  >
                    <li className="relative border-b-2 rounded-lg border-gray-800 py-2 px-4 hover:bg-black/30 hover:shadow-lg hover:shadow-white/30 transition-colors duration-300">
                         <div className="absolute inset-0 rounded-lg bg-black opacity-10 backdrop-blur-sm"></div>
                         <span className="relative">{chapter.chapterNumber}</span>
                      </li>
                  </Link>
                ))
                : <li className="relative border-b-2 rounded-lg border-gray-800 py-2 px-4 hover:bg-black/30 hover:shadow-lg hover:shadow-white/30 transition-colors duration-300">
                         <div className="absolute inset-0 rounded-lg bg-black opacity-10 backdrop-blur-sm"></div>
                         <span className="relative"> Nothing Chapter Found</span>   
                 </li> }     
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaChapterList;
<li className="block border-b-2 border-gray-500 py-2 px-4 hover:bg-sky-700 transition-colors">
e
</li>