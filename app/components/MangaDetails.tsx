'use client';
import Link from "next/link";
import { useGetMangaByIdQuery } from "../Redux/features/Api/MangaApi";
import StarRating from "./StarRating";


interface MangaDetailsProps{
    mangaId: string;
}

function MangaDetails( { mangaId }: MangaDetailsProps) {

    const {data:manga , isLoading, isError, error} = useGetMangaByIdQuery( mangaId, 
     { skip: !mangaId}
    );
  
    // if ( isLoading) return <Spinner />
    return (
        <div className="transition-all duration-200 ease-linear ">
          <div className=" p-4 sm:text-xl font-semibold py-10 mt-6 ">
            <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl min-w-56 mx-auto">
              <div className="flex justify-center items-center ">
                <img
                  src="/images/Pasted image (2).png"
                  alt="Description of the image"
                  className="w-max  h-auto object-cover rounded-lg mb-8 mt-4 transform scale-125 "
                />
              </div>
              <div className="flex flex-col justify-start  font-bold space-y-4 sm:m-6 col-span-2">
              <div  className="flex items-center">
                
                <StarRating mangaId={mangaId} rating={manga?.rateNumber} onRatingChange={() => manga?.rateNumber}  />
              <p className="ml-2 text-2xl">{manga?.rateNumber} </p>
              </div>
              
              <div className="space-y-2 outline outline-lime-600 rounded-lg p-4 divide-y-2">
                 <div className="flex items-center">
                   <h3 className="w-24 sm:w-32 font-semibold">Rate:</h3>
                   <p className="ml-2">{manga?.rateNumber}</p>
                 </div>
                 
                 <div className="flex items-center">
                   <h3 className="w-24 sm:w-32 font-semibold">Title:</h3>
                   <p className="ml-2">{manga?.title}</p>
                 </div>
                 
                 <div className="flex items-center">
                   <h3 className="w-24 sm:w-32 font-semibold">Author:</h3>
                   <p className="ml-2">{manga?.author}</p>
                 </div>
                 
                 <div className="flex items-center">
                   <h3 className="w-24 sm:w-32 font-semibold">Artist:</h3>
                   <p className="ml-2">{manga?.artist}</p>
                 </div>
                 
                 <div className="flex items-center">
                   <h3 className="w-24 sm:w-32 font-semibold">Status:</h3>
                   <p className="ml-2">{manga?.status}</p>
                 </div>
                 
                 <div className="flex items-center">
                   <h3 className="w-24 sm:w-32 font-semibold">Tags:</h3>
                   <p className="ml-2">{manga?.tagName}</p>
                 </div>
                 
                 <div className="flex items-center">
                   <h3 className="w-24 sm:w-32 font-semibold">Categories:</h3>
                   <div className="ml-2 flex space-x-2">
                     {manga?.categoriesName?.map((category, index) => (
                             <Link href={`/categories/${category}`} key={index}>
                             <span className="rounded px-2 py-1 bg-gray-200 cursor-pointer hover:bg-gray-300">
                               {category}
                             </span>
                           </Link>
                     ))}
                   </div>
                 </div>

               </div>
               
               
               

                
              </div>
              <div className=" divide-y-2  divide-gray-600 h-max mt-4  sm:m-5 sm:col-span-3">
            <h1 className=" my-2"> Manga Description </h1>
            <h4 className=" text-gray-400 text-sm italic p-4 sm:p-6 "> dfvs fvsde vsdvsd vsd dfvs fvsde vsdvsd vsd dfvs fvsde vsdvsd vsd dfvs fvsde vsdvsd vsd dfvs fvsde vsdvsd vsd dfvs fvsde vsdvsd vsd dfvs fvsde vsdvsd vsd dfvs fvsde vsdvsd vsd dfvs fvsde vsdvsd vsd</h4>
           
          </div>
            </div>
          </div>
          
        </div>
      );
};

export default MangaDetails;