'use client'
import FilterResult from "@/app/components/FilterResult";
import Filter from "../../../../components/Filter";
import Head from "../../../../components/Layout/Header";
import { MangaFilter } from "@/app/Redux/features/Types/interfaces";
import { useState } from "react";
import { IoFilter } from "react-icons/io5";



interface MangaFilterProps {
    params: {
      pageNumber: number;
      title: string;
    };
  }



const MangaFilterPage:React.FC<MangaFilterProps> = ({ params }) => {

  const [open, setOpen] = useState<boolean>(false);

  const toggleSearchFilter = () => {
    setOpen(!open)
  }
    const [filterData, setFilterData] = useState<MangaFilter>({
        title: params.title,
        artist: '',
        author: '',
        categoryId: '',
        status: undefined,
        yearOfIssue: '',
        orderByUpdatingDate: false,
        orderByViews: false,
        pageNo: params.pageNumber,
        pageSize: 10
      });
    const handleFilterChange = (filter:MangaFilter) => {
        setFilterData(filter);
    };
    return(
      <>
        <div className="  px-4 flex justify-center items-center   w-full">
          <div  className=" m-4 flex justify-end items-center shadow-md shadow-sky-400 border-b-2 w-full border-sky-900 rounded-xl  max-w-2xl">
            <span >
            Filter Manga 
          </span>
          <IoFilter 
          onClick={toggleSearchFilter} className=" text-xl m-4 md:text-2xl" />
        </div>
        </div>
       
        
        <Filter isOpen={open} toggleSearchFilter={toggleSearchFilter} onFilterChange={handleFilterChange}/>
        <FilterResult filter={filterData} />
        
        </>
            );
};

export default MangaFilterPage;