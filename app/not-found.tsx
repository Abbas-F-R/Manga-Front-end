// pages/404.tsx

"use client"; // Ensure this is a client component

import { motion } from "framer-motion";
import Link from "next/link";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <motion.div
        className="text-center p-8 rounded-lg shadow-lg bg-gray-800 w-full max-w-md"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-8xl font-extrabold text-red-500 md:text-9xl">404</h1>
        <p className="mt-4 text-3xl font-semibold md:text-4xl">Page Not Found</p>
        <p className="mt-2 text-gray-400">Sorry, the page you are looking for does not exist.</p>
        <Link
          href="/Pages/Home/1"
          className="mt-6 inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
        >
          Go to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
