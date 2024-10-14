import Link from 'next/link';
import { LuSun } from "react-icons/lu";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { PiExclamationMarkBold } from "react-icons/pi";
import { IoIosBookmark } from "react-icons/io";

interface ChapterHeadProps {
  chapterNumber?: number;
  mangaName?:string;
  mangaId:string;
  handeldarkMode: () => void;
  darkMode: boolean;
}

function ChapterHead ({chapterNumber, mangaName, mangaId, handeldarkMode, darkMode}: ChapterHeadProps){
  
  

  return(
  <nav  className="flex justify-center items-center" >

    <div className="px-3 mx-4  w-10/12  sm:w-3/4 lg:w-3/6 max-w-3xl ">
   
    <div className="flex m-8 justify-start break-words  text-lg lg:text-xl ">
        <h1> {mangaName} - {chapterNumber}</h1>
    </div>
    <div className={`flex flex-row  justify-end  text-gray-500  m-6 sm:text-md`} > 
          <span className=" mr-1">{chapterNumber}</span>
      <span className="mx-2">/</span>
      <span className=" text-center  max-w-2/3 line-clamp-2  hover:text-sky-600 transition-all duration-500 ">
      <Link href={`/Manga/${mangaId}`} className='text-center'>{mangaName} ddddddddddddddddddddddd dddddddddddddddddd ddddddddddddddddddd dddddddddddddddddd ddddddddddd dddddddddd</Link>
      </span>
      <span className="mx-2 ">/</span>
      <span className="ml-1  "> <Link href={`/Home/1`} className=' p-2 text-center border-gray-700 hover:border-b-2   hover:text-sky-600 hover:border-gray-700 transition-all duration-300 ease-out '>الرئيسية</Link></span>
      </div>
    
    <div className="flex justify-center items-center h-10">
    <button onClick={handeldarkMode} 
  className={`flex justify-center items-center bg-gray-900 w-8 h-8 mx-1 rounded-full ${
    darkMode
      ? "hover:shadow-xl hover:shadow-yellow-400 hover:bg-orange-200 hover:justify-end hover:px-2 hover:text-2xl hover:w-10 hover:h-10 transition-all duration-500 ease-out"
      : "hover:shadow-xl hover:shadow-white hover:bg-sky-900 hover:justify-start hover:px-2 hover:text-2xl hover:w-10 hover:h-10 transition-all duration-500 ease-out"
         }`}
           >
             {darkMode ? <LuSun /> : <BsFillMoonStarsFill />}
           </button>
        
        <button   className="flex justify-center items-center bg-gray-900 w-8 h-8 mx-1 rounded-full
         hover:shadow-xl hover:shadow-red-400 hover:bg-red-600  hover:text-neutral-900  hover:px-2 hover:text-2xl
          hover:w-10 hover:h-10  transition-all duration-500  ease-out"><PiExclamationMarkBold /></button>
        <button className="flex justify-center items-center bg-gray-900 w-8 h-8 mx-1 rounded-full hover:px-2 hover:text-2xl
         hover:shadow-lg hover:shadow-sky-500 hover:bg-sky-700   hover:text-neutral-900 hover:w-10
          hover:h-10  transition-all duration-500  ease-out"><IoIosBookmark /></button>
    </div>
    </div>
    
  </nav>
  

)};

export default ChapterHead;
