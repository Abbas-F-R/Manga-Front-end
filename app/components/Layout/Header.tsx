"use client";
import Link from 'next/link';
import { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Sidebar from '../Sidebar';
import SearchForm from '../SearchForm';
import {motion} from 'framer-motion';
import { HeaderContentVariants, HeaderLinksVariants, headerVariants, PathVariants } from '@/app/Variants/HeaderVariants';

const Header =  () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchFormOpen, setIsSearchFormOpen] = useState(false);

  const toggleSearchForm = () => setIsSearchFormOpen(!isSearchFormOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return(
  
  
  <motion.nav
   variants={headerVariants}
   initial="hidden"
   animate="visible"
   exit="exit"
   className=" flex items-center justify-around py-2 px-6 sm:p-4 border-b-2 border-sky-600  text-sky-500  ">
    
    <motion.div
     className=" w-38 sm:w-48"
   
     >
      <svg className=' mx-4 w-36 h-20 sm:w-48  translate scale-90 md:scale-100 '>
        <motion.path
        fill="none"
         d="M 0 60  L30 20 L 60 45 L90 20 L120 60" stroke='#42a6cb' strokeWidth={"5px"}
         variants={PathVariants}
         />
      </svg>
      {/* <img src="/images/mangalek.png" alt="مانجا ليك" className="w-52" /> */}
    </motion.div>
    <div
         className="hidden lg:flex space-x-4">
     <Link href="/register"> 
      <motion.div 
       className=" rounded-lg bg-slate-800 p-2 text-center font-bold text-sky-400"
       variants={HeaderLinksVariants(0.5, -100, 50)}
       whileHover={{ scale: 1.1, originX: 0, boxShadow: "-3px 3px 10px rgb(4,111,194)", textShadow: "0px 0px 10px rgb(4, 111, 194)",
        transition: {
          duration: 0.3,
        },}}
      >
        تسجيل الدخول 
      </motion.div>
     </Link>
     <Link href="/MangaFilter/undefined/1"> 
      <motion.div
      className=" rounded-lg bg-slate-800 p-2 text-center text-sky-400"
      variants={HeaderLinksVariants(0.5, -100, 50)}
      whileHover={{ scale: 1.1, originX: 0, boxShadow: "-3px 3px 10px rgb(4,111,194)", textShadow: "0px 0px 10px rgb(4, 111, 194)",
        transition: {
          duration: 0.3,
        },}}
      >
         قائمة المانحا  
      </motion.div></Link>
      {/* <Link href="/MangaFilter/undefined/1">
      <motion.div
       className=" rounded-lg bg-slate-900 p-2 text-center  text-sky-400"
      
      variants={HeaderLinksVariants(0.5, -100, 50)} 
      whileHover={{ scale: 1.1, originX: 0, boxShadow: "-5px 5px 10px rgb(4,111,194)", textShadow: "0px 0px 10px rgb(4, 111, 194)",
        transition: {
          duration: 0.2,
        },}}
      > 
      متقدم  
      </motion.div></Link> */}
      <Link href="/1">
      <motion.div
       className=" rounded-lg bg-slate-800 p-2 text-center  text-sky-400"
      variants={HeaderLinksVariants(0.5, -100, 50)}
      whileHover={{ scale: 1.1, originX: 0, boxShadow: "-3px 3px 10px rgb(4,111,194)", textShadow: "0px 0px 10px rgb(4, 111, 194)",
        transition: {
          duration: 0.2,
        },}}
      >   الرئيسية   
      </motion.div></Link>
     
    </div>
    <div className="flex justify-center items-center">
    <motion.span 
     variants={HeaderContentVariants(0.1, -100, 0)}
     whileHover={{ scale: 1.1, originX: 0, boxShadow: "-3px 3px 10px rgb(4,111,194)", textShadow: "0px 0px 10px rgb(4, 111, 194)",
      transition: {
        duration: 0.2,
      },}}
    className="bg-slate-800 w-12 h-11 rounded-full flex justify-center items-center cursor-pointer">
      <FaSearch 
      onClick={toggleSearchForm}
      className="text-2xl  "/>
    </motion.span>
    <motion.div 
     variants={HeaderContentVariants(0.1, -100, 0)}
     whileHover={{ scale: 1.1, originX: 0, boxShadow: "0px 3px 15px rgb(4,111,194)", textShadow: "0px 0px 15px rgb(4, 111, 194)",
      transition: {
        duration: 0.2,
      },}}
      className="lg:hidden bg-slate-800 w-10 h-11 rounded-lg flex justify-center items-center cursor-pointer ">
    <FaBars
    onClick={toggleSidebar}
    className="text-3xl " />
    </motion.div>
    </div>
       
    <Sidebar isOpen={isSidebarOpen}  toggleSidebar={toggleSidebar} />
      <SearchForm isOpen={isSearchFormOpen} toggleSearchForm={toggleSearchForm} />
  </motion.nav>
  
   
)};

export default Header;
