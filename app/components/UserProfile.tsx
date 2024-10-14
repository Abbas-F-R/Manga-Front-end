"use client";
import { motion } from "framer-motion";
import { useGetUserQuery } from "../Redux/features/Api/UserApi";
import { useEffect, useState } from "react";
import UserPosts from "./UserPosts";
import Link from "next/link";
import { GoPlus } from "react-icons/go";

const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 , boxShadow: "inset -10px -25px 30px rgba(50,80,120), 10px 25px 40px rgba(50,80,120)"  },
    exit: { opacity: 0, scale: 0.9 }, // exit state
};

const imgVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
    exit: { scale: 0 }, // exit state
};

const textVariants = {
    hidden: { y: -40, scaleX: 0 },
    visible: { y: -20, scaleX: 1 , transition: {
        type: 'spring', stiffness: 100, duration: 0.5, delay: 1
    }},
    exit: { y: -20, scaleX: 0 }, // exit state
};

const UserProfile = () => {

    const [isHover, setIsHover] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const getUsername = (): string | null => {
            if (typeof window !== 'undefined') {
                return localStorage.getItem('username') || null;
            }
            return null;
        };

        setUsername(getUsername());
    }, []);

    const { data, isLoading, isError, error } = useGetUserQuery(username, {
        skip: !username,
    });

    console.log(username, "Id: ", data?.id);
    return (
        <>
        <motion.div
            className="relative flex flex-col items-center justify-center text-white p-6 md:p-10 rounded-custom-shape max-w-sm mx-auto lg:max-w-md" 
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            transition={{ type: 'spring', stiffness: 100 }}
        >
            <div className="space-y-4 text-center">
                <motion.p
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    // transition={{  }}
                    className="text-lg md:text-xl lg:text-2xl font-semibold border-b-2 border-cyan-700 "
                >
                    {data?.name || 'Abbas Fadil'}
                </motion.p>

                <motion.img
                    src={data?.imageProfile
                        ? `http://localhost:5113/${data.imageProfile}`
                        : "/images/b.png"}
                    alt={`${data?.name || 'User'}'s profile`}
                    className="w-32 h-32 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full mx-auto"
                    variants={imgVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 100 }}
                />

                <motion.p
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
                    className="text-gray-400 text-sm md:text-base lg:text-lg min-w-44"
                >
                    {data?.username || 'Abbas.F.R'}
                </motion.p>
            </div>
            <motion.button
                initial={{opacity: 0 , x: -24 , y: 0}}
                animate={{opacity: 1 , x: 0, y:-24}}
                whileHover={{ width: 150 , transition: { when: "beforeChildren" }}}
              
                onMouseEnter={() => 
                 setIsHover(true)
                }
                onMouseLeave={() => 
                 setIsHover(false)
                }
                className="absolute top-16 right-2 rounded-full "
              >
              <Link href={`/AddManga`}   
              className=" flex items-center transform bg-green-600 rounded-full  hover:bg-black ">      
              <div className={ isHover ?"transform transition-transform duration-500 rotate-180 text-green-500" : "text-black"}>
                 <GoPlus className=" text-5xl" />
               </div>
                <motion.p
                  initial={{ opacity: 0,  scaleX: 0 }} 
                  animate={isHover ? { opacity: 1, scaleX: 1,
                  } : { opacity: 0, scaleX: 0, }} 
                  transition={{ duration: 0.05 }} 
                  className={` font-bold transition-all duration-500 pr-1 text-left  ${isHover ? "block text-emerald-500 " : "hidden"}`}
                >
                  Add Manga
                </motion.p>
                </Link>

              </motion.button>
        </motion.div>
        <UserPosts userId={data?.id}/>
        </>
    );
};

export default UserProfile;
