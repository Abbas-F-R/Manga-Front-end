import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Status } from "../Redux/features/Types/enums";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { useGetCategoriesQuery } from "../Redux/features/Api/CategoryApi";
import { CategoryFilter, MangaFilter } from "../Redux/features/Types/interfaces";

interface FilterProps {
  onFilterChange: (data: MangaFilter) => void;
  toggleSearchFilter: () => void;
  isOpen: boolean;


}
const Filter: React.FC<FilterProps> = ({ onFilterChange , toggleSearchFilter, isOpen}) => {
  
  const [artist, setArtist] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [status, setStatus] = useState<Status | undefined>(undefined);

  const [orderByViews, setOrderByViews] = useState<boolean | undefined>(undefined); // New state for ordering by views
  const [orderByUpdatingDate, setOrderByUpdatingDate] = useState<boolean | undefined>(undefined); // New state for ordering by updating date
  const [userId, setUserId] = useState<string>(''); // New state for user ID
  const [yearOfIssue, setYearOfIssue] = useState<string>('')

  const [openCategory, setOpenCategory] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [open, setOpen] = useState<boolean>(false);


  const filter: CategoryFilter = {
    Name: 'string' 
  }

   const { data:CategorisPage, isLoading, isError, error } = useGetCategoriesQuery(filter);
   const data = CategorisPage?.data
   useCallback(() => {
    console.log(categoryId)
  }, [data]);
   const selectedCategory = data?.find(category => category.id === categoryId);
 

   const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
  
    if (selectedOption === "Views") {
      setOrderByViews(true);
      setOrderByUpdatingDate(undefined); // Reset other state
    } else if (selectedOption === "Latest Chapters") {
      setOrderByViews(undefined);
      setOrderByUpdatingDate(true);
    } else {
      setOrderByViews(undefined);
      setOrderByUpdatingDate(undefined);
    }
  };

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
  };
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setter(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFilterChange({
       artist,
       author, 
       categoryId,
       status ,
       orderByViews,
       orderByUpdatingDate,
       yearOfIssue
       });

    setArtist('');
    setAuthor('');
    setCategoryId('');
    setStatus(undefined);

    setOrderByViews(undefined);
    setOrderByUpdatingDate(undefined);
    setUserId('');
    setYearOfIssue('');

    setOpenCategory(false);
    setOpen(false); 
  };

  return (
    <>
     <div onClick={toggleSearchFilter}
     className={`${isOpen ? 'transform -translate-x-0' : 'hidden transform translate-x-full'} z-20 fixed inset-0 transition-all justify-center duration-700 ease-out`}>
      <div 
      className="absolute grid justify-items-center bg-white/15 backdrop-blur-lg border p-8 shadow-lg text-center text-white w-full h-full">
     <div 
     onClick={handleContentClick}
     className=" flex flex-col mt-8 items-center p-4 pb-10 rounded-lg  sm:w-4/6 max-w-[700px]  h-max bg-white/10">
      <form 
     onSubmit={handleSubmit} className="   flex flex-col items-center ">
     <h1 className=" m-12 text-xl sm:text-2xl"> Manga Filter</h1>
        <div
           className="relative  mb-8 grid grid-cols-3 sm:grid-cols-4 px-4 sm:px-0 gap-x-6 gap-y-10 sm:w-4/5">
          <input
            id="atrist"
            type="text"
            value={artist}
            onChange={handleInputChange(setArtist)}
            className="outline-none focus:border-b-2 border-yellow-800 rounded-lg bg-gray-950 h-10 px-3 col-span-3 sm:col-span-2 focus:placeholder:text-amber-500  focus:shadow-lg focus:shadow-yellow-400 transition-all duration-500  ease-out"
            placeholder="Enter artist"
          />

          <input
            id="author"
            type="text"
            value={author}
            onChange={handleInputChange(setAuthor)}
            className="outline-none focus:border-b-2 border-red-700 rounded-lg bg-gray-950 h-10 px-3 col-span-3 sm:col-span-2 focus:placeholder:text-red-500  focus:shadow-lg focus:shadow-red-400 transition-all duration-300  ease-out"
            placeholder="Enter author"
          />
          
          <input
            id="yearOfIssue"
            type="text"
            value={yearOfIssue}
            onChange={handleInputChange(setYearOfIssue)}
            className="outline-none focus:border-b-2 selection:hidden  border-sky-500 rounded-lg bg-gray-950 h-10 px-3 col-span-3 sm:col-span-2  focus:placeholder:text-sky-400  focus:shadow-lg focus:shadow-sky-400  transition-all duration-300 ease-out"
            placeholder="Enter Year of Issue"
            min="1950"
            max={new Date().getFullYear()}
          />

          

          <div 
            onClick={() => setOpen(!open)}
            className="relative flex items-center justify-between border-none rounded-lg bg-gradient-to-l
             from-gray-950 to-sky-600 h-10 pl-3 col-span-3 sm:col-span-2 
            hover:bg-gradient-to-r hover:from-sky-800 hover:to-sky-300 hover:border-spacing-1
             font-bold hover:border-black hover:text-black transition-all duration-300 ease-in">
            {status !== undefined ? Status[status] : "Manga Status"}
            {open ? 
              <div className="flex items-center justify-between h-10 px-2 rounded-e-lg bg-black text-lg">
                <TiArrowSortedDown className="text-sky-600" />
              </div> 
              : 
              <div className="flex items-center justify-between h-10 px-2 rounded-e-lg bg-black text-lg">
                <TiArrowSortedUp className="text-sky-600" />
              </div>
            }
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer outline-none bg-orange-800 text"
            >
              <option value={Status.NotStarted}>Not Started</option>
              <option value={Status.InProgress}>In Progress</option>
              <option value={Status.Completed}>Completed</option>
            </select>
          </div>

    
      <div 
         onClick={() => setOpenCategory(!openCategory)}
        className="relative flex items-center justify-between border-none rounded-lg bg-gradient-to-l 
        from-red-700 via-red-950 to-black h-10 pl-3 col-span-3 sm:col-span-2 hover:shadow-sm hover:shadow-red-600
         hover:to-black hover:border-spacing-1 font-bold
         transition-colors duration-500 ease-out"
      >
        {selectedCategory ? selectedCategory.name : "Select Category"}
        {openCategory ? 
          <div className="flex items-center justify-between h-10 px-2 rounded-e-lg bg-red-800 text-lg">
            <TiArrowSortedDown className="text-black" />
          </div> 
          : 
          <div className="flex items-center justify-between h-10 px-2 rounded-e-lg bg-red-800 text-lg">
            <TiArrowSortedUp className="" />
          </div>
        }
        <select
          id="categoryId"
          value={categoryId}
          onChange={handleCategoryChange}
          className="absolute inset-0 opacity-0 cursor-pointer outline-none bg-orange-800"
        >
          <option value="" disabled hidden>Select Category</option>
          {data?.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
     
      <div 
    onClick={() => setOpenSort(!openSort)}
    className="relative flex items-center justify-between border-none rounded-lg bg-gradient-to-l 
    from-red-700 via-red-950 to-black h-10 pl-3 col-span-3 sm:col-span-2 hover:shadow-sm hover:shadow-red-600
    hover:to-black hover:border-spacing-1 font-bold
    transition-colors duration-500 ease-out"
  >
    { orderByViews ? " Views" : orderByUpdatingDate ? "Latest Chapters" : "Order By"}
    
    {openSort ? 
      <div className="flex items-center justify-between h-10 px-2 rounded-e-lg bg-red-800 text-lg">
        <TiArrowSortedDown className="text-black" />
      </div> 
      : 
      <div className="flex items-center justify-between h-10 px-2 rounded-e-lg bg-red-800 text-lg">
        <TiArrowSortedUp className="" />
      </div>
    }

    <select
      id="sortBy"
      value={orderByViews ? "Views" : orderByUpdatingDate ? "Updating Date" : "Latest Chapters"}
      onChange={handleSortChange}
      className="absolute inset-0 opacity-0 cursor-pointer outline-none bg-orange-800"
    >
      <option value="Creation Date"> New Manga</option>
      <option value="Views">Views</option>
      <option value="Latest Chapters">Latest Chapters</option>

    </select>
  </div>

  </div>
        <button
            type="submit"
             className="relative  bg-gradient-to-r from-green-500 to-teal-600  text-white py-2 px-6 rounded-lg mt-4 
             hover:from-green-800 hover:to-teal-900 
             transition-all duration-300 ease-out 
             transform hover:scale-110 hover:shadow-xl shadow-md"
>
  <span className="relative z-10">Apply Filters</span>
  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-600 opacity-30 rounded-lg blur-3xl z-0"></div>
</button>
      </form>
      </div>
      </div>
    </div>
    </>
  );
};

export default Filter;
