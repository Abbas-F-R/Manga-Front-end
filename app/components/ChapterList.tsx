import React from "react";
import Link from "next/link";
import { ChapterPageResponse } from "../Redux/features/Types/interfaces";
interface ChapterListProps {
  Display: boolean;
  setDisplay: (Display: boolean) => void;
  data?: ChapterPageResponse[];
}

const ChapterList: React.FC<ChapterListProps> = ({ Display, setDisplay,  data }) => {


  return(
    <div
    onClick={() => setDisplay(!Display)}
    className={` fixed inset-0 ${
      Display ? "flex" : "hidden"
    }  justify-center bg-white/20 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg text-center text-white w-full h-full`}
  >
    <div className="flex justify-around items-center h-full">
      <div className="absolute top-1/4 bottom-1/3 flex rounded-lg bg-[#00000042] px-4 w-1/5 min-w-36">
        <ul className="w-full py-6 px-4 overflow-y-auto custom-scrollbar">
          {data?.map((chapter, index) => (
            <Link
              key={index}
              href={`/${chapter.chapterNumber}/${chapter.id}`}
              className="w-full"
            >
              <li className="border-b-2 border-gray-500 w-full p-2">
                {chapter.chapterNumber}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  </div>
  )};
  
  export default ChapterList;
  