'use client'; 
import PagesNumbers from "./PagesNumpers";
import Link from "next/link";
import { useGetMangasQuery } from "../Redux/features/Api/MangaApi";
import { MangaFilter } from "../Redux/features/Types/interfaces";
// import Spinner from "./Loading";
import Error from "./Error";
import 'aos/dist/aos.css'; // Import AOS CSS
import { motion} from 'framer-motion';
import { headerVariants } from "../Variants/HeaderVariants";




interface TrindingMangaProps {
  pageNumber: number ;
}

function TrendingManga ({pageNumber}: TrindingMangaProps){

  const filter: MangaFilter = {
    pageNo: pageNumber ,
    pageSize: 18,
  };
  
  const {data: mangasPage, isLoading, isError, error} = useGetMangasQuery(filter);
  const mangas = mangasPage?.data;

 
  const getDateStatus = (creationDate: string) => {
    if (!creationDate) return "NEW";
    const creationDateObj = new Date(creationDate);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - creationDateObj.getTime();
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    
    return daysDiff <= 2 ? "NEW" : creationDateObj.toLocaleDateString('en-GB');
  };

  // if (isLoading) return ( <Spinner /> );  
  if (isError) return (<Error message={(error as any).data?.message || " "} />);
  
  
 

  // console.log(" Manga  sesfsedfvc serdfsdevcsde:", pageNumber ,"count", mangasPage?.pagesCount, " totale" , mangasPage?.totalCount)

  return (
    <>
     <motion.div 
        variants={headerVariants}
        initial='hidden'
        animate='visible'
        className=" flex justify-center items-center pt-4 ">
          <span className='text-center text-xl border-b-2 p-2 border-yellow-500 rounded-md w-44'>
             احدث الفصول 
             </span>
        </motion.div>
          <motion.div
             className="grid grid-cols-2 sm:grid-cols-3 justify-items-end  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-10 px-4 sm:px-8 md:px-10 lg:px-16 xl:px-24 ">
          {mangas?.map((manga, index) => (
           <motion.div
           initial={{ y: -100 , x: -100 , opacity: 0}}
           whileInView={{x: 0, y: 0 , opacity: 1,
            transition:{
              delay: 0.05 *index + 0.05,
              duration: 0.2,
              type: 'spring', stiffness: 100
            }
           }}
           exit={
            {x: 100, 
              y: -100 , 
              opacity: 0,
            transition:{
              delay: 0.02 *  index ,
              duration: 0.2,
              type: 'spring', stiffness: 100
            }
           }}
           viewport={{
            once: true
           }}
            key={index} 
            className="grid grid-cols-1 w-40 xl:w-44 ">
                             <Link  href={`/Manga/${manga.id}`} > 

              <img
                src="http://localhost:5113/Attachments/e55141e4-3ba4-4c37-b4d5-645960b99946.png"
                alt="ءسفقيعغلع  فغغفبغ"
                className="rounded-t-lg shadow transition-all duration-300 filter hover:scale-105 hover:shadow-lg w-11/12"
                loading="lazy"              />
               <span className="line-clamp-2 p-2 h-14">
                  uhuisha uidhdui asujpco isjcos osios ioiso osiapoi
                  </span>
                </Link>
                <div className="m-2">
  {manga.chapterNumber && manga.chapterNumber.length > 0 ? (
    manga.chapterNumber.map((number, index) => {
      const creationDate = manga.creationDate?.[index];
      const chapterId = manga.chapterId?.[index];
      const dateStatus = getDateStatus(creationDate ?? "");

      return creationDate ? (
        <div key={index} className="flex justify-between items-center my-2">
          <span
            className={`px-2 py-1 text-center rounded w-auto ${dateStatus === "NEW" ? "bg-red-600" : ""} text-black`}
          >
            {dateStatus}
          </span>
          <Link
            href={`/${number}/${chapterId}`}
            className="bg-neutral-800 text-white text-center flex-wrap px-3 py-1 rounded w-auto"
          >
            {number}
          </Link>
        </div>
      ) : null; // Return null if there's no creationDate
    })
  ) : (
    <div className="text-center text-red-500  bg-slate-900 rounded-sm py-2 ">
      لا يوجد فصول حاليا
    </div>
  )}
</div>

              </motion.div>
                 ))}
        </motion.div>
        {mangas &&
      <PagesNumbers pageUrl="/Home" totalPages={mangasPage?.pagesCount} currentPage={mangasPage?.currentPage} /> 
        }</>
  )};
  
  export default TrendingManga;
  
  
