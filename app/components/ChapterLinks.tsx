'use client';
import { FaBars } from "react-icons/fa";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { ChapterPageResponse } from "../Redux/features/Types/interfaces";
import Link from "next/link";
import { useState } from "react";
import Tooltip from "./Tooltip";
import ChapterImages from "./ChapterImages";
import ChapterList from "./ChapterList";
import CommentsSection from "./CommentsSection";
import { useGetChapterByIdQuery, useGetChaptersQuery } from "../Redux/features/Api/ChapterApi";
import Spinner from "./Loading";
import Error from "./Error";
import ChapterHead from "./ChapterHead";
export { motion } from "framer-motion"



interface ChapterLinksProps {
  chapterId: string;
  chapterNumber: number; 

}


function ChapterLinks({chapterId, chapterNumber}: ChapterLinksProps) {

  const [darkMode, setDarkMode] = useState(false);

  const [isChapterListVisible, setChapterListVisible] = useState(false);
  const [displayToolTipNext, setDisplayToolTipNext] = useState<boolean>(false);
  const [displayToolTipPrevious, setDisplayToolTipPrevious] = useState<boolean>(false);



  const handleDisplay = () => {
    setChapterListVisible(prevState => !prevState);
  };


  const handeldarkMode = () => {
    setDarkMode(!darkMode);
  }
  const { data: chapter, isLoading: chapterIsLoading, isError } = useGetChapterByIdQuery(chapterId, {
    skip: !chapterId,
  });

  const { data: chapters, isLoading: isChaptersLoading, isError: isChaptersError, error: chaptersError } = useGetChaptersQuery(
    { mangaId: chapter?.mangaId ?? '', pageNo: 1 },
    {
      skip: !chapter?.mangaId && isChapterListVisible
    }
  );

  if (chapterIsLoading || isChaptersLoading) {
    return <Spinner />;
  }
     const data = chapters?.data;

    //  if (isChaptersError || isError ) return <Error message="Failed to load data!" />;
     const currentChapterIndex = data?.findIndex(chap => chap.id === chapterId);

     const nextChapter = data && currentChapterIndex !== undefined && currentChapterIndex < data.length - 1
       ? data[currentChapterIndex + 1]
       : null;
   
     const previousChapter = data && currentChapterIndex !== undefined && currentChapterIndex > 0
       ? data[currentChapterIndex - 1]
       : null;
  

  const handleMouseEnterPrevious = () => {
    setDisplayToolTipPrevious(true);
};

const handleMouseLeavePrevious = () => {
  setDisplayToolTipPrevious(false);
};
  const handleMouseEnterNext = () => {
    setDisplayToolTipNext(true);
};

const handleMouseLeaveNext = () => {
  setDisplayToolTipNext(false);
};

    return (
      <>
              <ChapterHead mangaId={chapterId} chapterNumber={chapterNumber}  handeldarkMode={handeldarkMode} darkMode={darkMode}/>

        <div  className=" flex justify-center items-center">
        <div className=" flex justify-between  items-center mx-4 my-4   w-10/12  sm:w-3/4 lg:w-3/6 max-w-3xl  ">
        <div className="flex justify-end items-center ">

          <div className="relative transition-all duration-200"
           onMouseEnter={handleMouseEnterPrevious}
           onMouseLeave={handleMouseLeavePrevious}>
            <Tooltip  message="Previous Chapter" display={displayToolTipPrevious}/>
          
        { nextChapter ?
              <Link
               href={`/${nextChapter?.chapterNumber}/${nextChapter?.id}`}>
                <div 
                 
              className="flex justify-center items-center rounded-xl mx-2  bg-gray-900  w-10 h-10 hover:shadow-lg hover:shadow-sky-500 hover:bg-sky-700 hover:justify-end  hover:text-neutral-900 hover:px-2  transition-all duration-500  ease-out">
             <SlArrowLeft  className=" text-xl " /></div></Link>
            : <div className="flex justify-center items-center rounded-xl mx-2  bg-red-800  w-10 h-10 hover:shadow-lg hover:shadow-red-800 hover:bg-gray-900 hover:justify-end  hover:px-2  transition-all duration-500  ease-out">
             <SlArrowLeft  className=" text-xl " /></div>
          }</div>

          <div className="relative "
           onMouseEnter={handleMouseEnterNext}
           onMouseLeave={handleMouseLeaveNext}>
            <Tooltip  message="Next Chapter" display={displayToolTipNext}/>
          
        {previousChapter ? 
           <Link href={`/${previousChapter?.chapterNumber}/${previousChapter?.id}`}><div
             className="flex justify-center items-center rounded-xl mx-2  bg-gray-900  w-10 h-10 hover:shadow-lg hover:shadow-sky-500 hover:bg-sky-700 hover:justify-start  hover:text-neutral-900 hover:px-2  transition-all duration-500  ease-out">
          <SlArrowRight className=" text-xl " /> </div></Link>
           :   <div  className="flex justify-center items-center rounded-xl mx-2  bg-red-800  w-10 h-10 hover:shadow-lg hover:shadow-red-800 hover:bg-gray-900 hover:justify-start  hover:px-2  transition-all duration-500  ease-out">
          <SlArrowRight className=" text-xl " /> </div> }
         </div>
        </div>
          <div onClick={handleDisplay} className=" flex justify-center items-center rounded-xl hover:shadow-lg hover:shadow-sky-500 hover:bg-sky-700 hover:text-neutral-900  transition-all duration-500 w-10 h-10">
            <FaBars className="text-3xl  " />
          </div>
      </div>
      <div/>
      </div>
      <ChapterImages path={chapter?.imagesPath}  />
      <div  className=" flex justify-center items-center">
        <div className=" flex justify-between  items-center mx-4 my-4   w-10/12  sm:w-3/4 lg:w-3/6 max-w-3xl  ">
        <div className="flex justify-end items-center ">

          <div className="relative transition-all duration-200"
           onMouseEnter={handleMouseEnterPrevious}
           onMouseLeave={handleMouseLeavePrevious}>
            <Tooltip  message="Previous Chapter" display={displayToolTipPrevious}/>
          
        { nextChapter ?
              <Link
               href={`/${nextChapter?.chapterNumber}/${nextChapter?.id}`}>
                <div 
                 
              className="flex justify-center items-center rounded-xl mx-2  bg-gray-900  w-10 h-10 hover:shadow-lg hover:shadow-sky-500 hover:bg-sky-700 hover:justify-end  hover:text-neutral-900 hover:px-2  transition-all duration-500  ease-out">
             <SlArrowLeft  className=" text-xl " /></div></Link>
            : <div className="flex justify-center items-center rounded-xl mx-2  bg-red-800  w-10 h-10 hover:shadow-lg hover:shadow-red-800 hover:bg-gray-900 hover:justify-end  hover:px-2  transition-all duration-500  ease-out">
             <SlArrowLeft  className=" text-xl " /></div>
          }</div>

          <div className="relative "
           onMouseEnter={handleMouseEnterNext}
           onMouseLeave={handleMouseLeaveNext}>
            <Tooltip  message="Next Chapter" display={displayToolTipNext}/>
          
        {previousChapter ? 
           <Link href={`/${previousChapter?.chapterNumber}/${previousChapter?.id}`}><div
             className="flex justify-center items-center rounded-xl mx-2  bg-gray-900  w-10 h-10 hover:shadow-lg hover:shadow-sky-500 hover:bg-sky-700 hover:justify-start  hover:text-neutral-900 hover:px-2  transition-all duration-500  ease-out">
          <SlArrowRight className=" text-xl " /> </div></Link>
           :   <div  className="flex justify-center items-center rounded-xl mx-2  bg-red-800  w-10 h-10 hover:shadow-lg hover:shadow-red-800 hover:bg-gray-900 hover:justify-start  hover:px-2  transition-all duration-500  ease-out">
          <SlArrowRight className=" text-xl " /> </div> }
         </div>
        </div>
          <div onClick={handleDisplay} className=" flex justify-center items-center rounded-xl hover:shadow-lg hover:shadow-sky-500 hover:bg-sky-700 hover:text-neutral-900  transition-all duration-500 w-10 h-10">
            <FaBars className="text-3xl  " />
          </div>
      </div>
      <div/>
      </div>
      <CommentsSection chapterId={chapterId} /> 
      <ChapterList Display={isChapterListVisible}  setDisplay={setChapterListVisible} data={data}/> 

      </>
    )
}
export default ChapterLinks;