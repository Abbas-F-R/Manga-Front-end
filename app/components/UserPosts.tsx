import Link from "next/link";
import { useGetMangasQuery } from "../Redux/features/Api/MangaApi";
import { MangaFilter, MangaPageResponse } from "../Redux/features/Types/interfaces";
import Error from "./Error";
import { GoPlus } from "react-icons/go";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";

interface TrindingMangaProps {
  userId?: string;
}

function UserPosts({ userId }: TrindingMangaProps) {
  const [page, setPage] = useState(1);
  const [mangas, setMangas] = useState<MangaPageResponse[]>([]);
  const [hoverStates, setHoverStates] = useState<boolean[]>([]); 

  const filter: MangaFilter = {
    userId: userId,
    pageSize: 10,
    pageNo: page,
  };

  const { data: mangasPage, isLoading, isError, error } = useGetMangasQuery(filter, {
    skip: !userId,
  });

  const mangaResponse = mangasPage?.data;

  useEffect(() => {
    if (mangaResponse && mangaResponse.length > 0) {
      setMangas((prevMangas) => [...prevMangas, ...mangaResponse]);
      setHoverStates((prevHoverStates) => [
        ...prevHoverStates,
        ...new Array(mangaResponse.length).fill(false),
      ]); 
    }
  }, [mangasPage]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
      !isLoading
    ) {
      if (mangasPage?.pagesCount !== undefined && mangasPage.pagesCount > page) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, false);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, page]);

  const handleHover = (index: number, isHovered: boolean) => {
    setHoverStates((prevStates) =>
      prevStates.map((hoverState, i) => (i === index ? isHovered : hoverState))
    );
  };

  if (isError) return <Error message={(error as any).data?.message || " "} />;

  return (
    <>
     <motion.div 
     className=" border-b-2 border-green-700 my-12 py-2">
            <motion.p className=" ">
              Result Count {mangasPage?.totalCount}
            </motion.p>
        </motion.div>
      <motion.div className=" grid grid-cols-1 sm:grid-cols-2 justify-items-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 py-10 mx-4 sm:mx-8 md:mx-10 lg:mx-16">
        {mangas?.map((manga, index) => (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1, transition: { delay: 0.01 * index, type: 'spring', stiffness: 80 } }}
            exit={{ x: 100, y: -100, opacity: 0, transition: { delay: 0.02 * index } }}
            viewport={{ once: true }}
            key={index}
            className="relative grid grid-cols-1 w-60 xl:w-64 p-4 justify-items-center"
          >
            <motion.img
              src="http://localhost:5113/Attachments/e55141e4-3ba4-4c37-b4d5-645960b99946.png"
              alt={manga.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-t-lg shadow transition-all duration-300 filter hover:scale-105 hover:shadow-lg w-11/12"
              loading="lazy"
            />
            <div className="flex-col justify-items-center">
              <Link href={`/Manga/${manga.id}`}>
                <h3 className="line-clamp-2 text-white p-4 hover:text-sky-500 overflow-hidden h-16">
                  {manga.title} jdrivjhsi edsfhvisd ijhsdffvpiof iddhnfvip ishcisdj ishnc9isd dhnvfisj
                </h3>
              </Link>
            </div>

            <motion.button
              initial={{ opacity: 0, x: -24, y: 0 }}
              animate={{ opacity: 1, x: 0, y: -24 }}
              whileHover={{ width: 160, transition: { when: "beforeChildren" } }}
              onMouseEnter={() => handleHover(index, true)}
              onMouseLeave={() => handleHover(index, false)}
              className="absolute top-2 right-0 rounded-full"
            >
              <Link href={`/AddChapter/${manga.id}`} className="flex items-center transform bg-sky-700 rounded-full hover:bg-black">
                <div className={hoverStates[index] ? "transform transition-transform duration-500 rotate-180 text-sky-500" : "text-black"}>
                  <GoPlus className="text-5xl" />
                </div>
                <motion.p
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={hoverStates[index] ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                  transition={{ duration: 0.05 }}
                  className={`font-bold transition-all duration-500 pr-1 text-left ${hoverStates[index] ? "block text-sky-600" : "hidden"}`}
                >
                  Add Chapter
                </motion.p>
              </Link>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default UserPosts;
