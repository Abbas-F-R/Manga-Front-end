import { FaSearch } from "react-icons/fa";
import { useSearchQuery } from "../Redux/features/Api/SearchApi";
import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchFormProps {
  isOpen: boolean;
  toggleSearchForm: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ isOpen, toggleSearchForm }) => {

  const router = useRouter(); 

  const [title, setTitle] = useState<string>("");
  const { data: mangaTitles, isLoading, isError, error } = useSearchQuery({ title }, {
    skip: !title || title === "" 
  });

  const inputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the input

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus(); // Focus the input when the form is opened
    }
  }, [isOpen]);

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    
  };

  // if (isLoading) return <div className="flex justify-center items-center"><div>جاري التحميل...</div></div>;

  const data  = mangaTitles?.data;
   

  const handleClick= () => {
    router.push(`/MangaFilter/${title}/1`);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <>
      <div
        onClick={toggleSearchForm}
        className={`${isOpen ? 'transform translate-y-0  ' : 'hidden transform translate-y-full'} z-20 fixed inset-0 transition-all duration-300 ease-out`}
      >
        <div dir="" className="absolute grid grid-rows-12    bg-white/20 backdrop-blur-lg border border-white/20  p-8 shadow-lg text-center text-white w-full h-full">
          <div className=" row-start-2 flex justify-around items-center">
            <div
              onClick={handleContentClick}
              className="absolute top-12 flex items-center rounded-full bg-[#00000042] px-4 sm:w-3/5 max-w-[500px]"
            >
              <input
                placeholder="ابحث هنا"
                id="in"
                type="text"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border-none outline-none bg-[#00000000] px-4 py-2 w-64 sm:py-3 sm:w-4/5 text-left"
                ref= {inputRef}
              />
              <FaSearch
              onClick={handleClick} 
              className="text-2xl text-gray-950 transform hover:rotate-45 hover:scale-105 hover:text-sky-400 transition-all duration-500 ease-out" />
            </div>
          </div>
        
          <div className="flex justify-center items-center row-span-8 h-max text-black">
            <div
              onClick={handleContentClick}
              className=" flex justify-center items-center rounded-xl bg-white/20 px-4 sm:w-3/6 max-w-[450px] font-sans"
            >
                {isError 
                ? ( <div 
                className="text-red-600 p-2 font-semibold"  > {(error as any).data?.message || " "} </div>
                           ) 
                           : (<ul className="border-none outline-none bg-[#00000000] px-4 py-2 w-64 sm:w-11/12 text-center text-sm overflow-y-auto custom-scrollbar">
                {data?.map((manga) => (
                  <Link  href={`/manga/${manga.id}`} ><li key={manga.id} className=" flex  items-start p-2 my-2 rounded-lg border-b-2 border-white/60">
                   
                    <img src="http://localhost:5113/Attachments/e55141e4-3ba4-4c37-b4d5-645960b99946.png" alt="" 
                    className="w-20 mr-2 "/>
                    <div className=" flex flex-col text-start">
                    <StarRating  rating={manga.RateNumber}   />
                     <h3>{manga.RateNumber} </h3> 
                     <h4 className=" line-clamp-3 ">{manga.title} nklsejdlkfdjewjjk dsjfk djklsdjfkjk dsjkjfsd kjfkdsjfkjds kjfdskjfkldj</h4> {/* أفترض أن كل عنصر له خاصية title */}
                     </div>
                  </li></Link>
                ))}
              </ul> )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchForm;
