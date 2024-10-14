import Link from "next/link";
import PagesNumbers from "./PagesNumpers";
// import Spinner from "./Loading";
import Error from "./Error";
import { useGetMangasQuery } from "../Redux/features/Api/MangaApi";
import { MangaFilter } from "../Redux/features/Types/interfaces";
import { motion } from "framer-motion"

interface FilterResultProps {
    filter: MangaFilter
  }


const FilterResult: React.FC<FilterResultProps> = ({ filter}) => {

    const mangaFilter: MangaFilter = {
        title: filter.title,
        artist: filter.artist,
        author: filter.author,
        categoryId: filter.categoryId,
        status: filter.status,
        pageNo: filter.pageNo ,
        pageSize: 10,
      };
    
      
      const {data: mangasPage, isLoading, isError, error} = useGetMangasQuery(filter ,{
        skip: !filter
      });
      const mangas = mangasPage?.data;

      const getDateStatus = (creationDate: string) => {
        if (!creationDate) return "NEW";
        const creationDateObj = new Date(creationDate);
        const currentDate = new Date();
        const timeDiff = currentDate.getTime() - creationDateObj.getTime();
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        
        return daysDiff <= 2 ? "NEW" : creationDateObj.toLocaleDateString('en-GB');
      };
      
  // if (isLoading) return <Spinner />;  
  if (isError) return <Error message={(error as any).data?.message || " "} />

    return (
     <>
          <div className="grid grid-cols-1 divide-y-2 divide-gray-600 justify-start sm:px-8 md:px-12 lg:px-22 lg:divide-y-0 md:grid-cols-2 xl:grid-cols-3 gap-4 py-4 mx-4 sm:mx-8 md:mx-10 lg:mx-16">
          
                {mangas?.map((manga, index) => (
                      <motion.div 
                      initial={{ y: 0 , x: 300 , opacity: 0}}
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
                         type: 'spring', stiffness: 100,
                       
                       }
                      }}
                      viewport={{
                       once: true
                      }} key={index} className="flex  justify-end text-center">
                        <div
                        className=" my-2 grid grid-row-3 mx-2 ">
                   <Link  href={`/Manga/${manga.id}`} className=" text-white  px-4 hover:text-gray-300 m-2"> 
                   <span className="line-clamp-2 row-span-2 hover:text-sky-500 transition-all duration-300 ease-out">
                      uhuisha uidhdui asujpco isjcos osios ioiso osiapoi
                      </span>
                    </Link>
                    <div className=" m-2  row-span-1 ">
                    {manga.chapterNumber?.map((number, index) => {
                    const creationDate = manga.creationDate?.[index];
                    const chapterId = manga.chapterId?.[index];
                    const dateStatus = getDateStatus(creationDate ?? "");
    
                    return creationDate ? (
                      <div key={index} className="flex justify-end gap-16 items-center my-2">
                        <span
                          className={`px-2 py-1 text-center rounded w-auto ${dateStatus === "NEW" ? "bg-red-600" : ""} text-black`}
                        >
                          {dateStatus}
                        </span>
                        <Link
                          href={`/${manga.title}/${number}/${chapterId}`}
                          className="bg-neutral-800 text-white text-center flex-wrap px-3 py-1 rounded w-auto"
                        >
                          {number}
                        </Link>
                      </div>
                    ) : null;
                  })}
                </div>
                </div>
              <img
              // ${manga.coverImage || '
                src="http://localhost:5113/Attachments/e55141e4-3ba4-4c37-b4d5-645960b99946.png"
                alt="ءسفقيعغلع  فغغفبغ"
                className="rounded
                -lg shadow transition-all duration-300 filter hover:scale-105  outline-none  hover:shadow-lg hover:shadow-sky-300 my-2  w-36"
              />
              
              </motion.div>
             ))}
      </div>
      <PagesNumbers pageUrl={`Pages/MangaFilter/${filter.title}`} totalPages={mangasPage?.pagesCount} currentPage={mangasPage?.currentPage} /> 
    
    </>
    );
};
export default FilterResult;