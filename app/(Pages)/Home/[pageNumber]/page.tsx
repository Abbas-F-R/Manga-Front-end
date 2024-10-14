// "use client";

import TrendingManga from '@/app/components/TrendingManga';
import {  ReactNode, Suspense } from 'react';

interface HomeProps {
  params: {
    pageNumber: number;
  };
  children?: ReactNode;
}

const Home: React.FC<HomeProps> = ({ params }) => {

  return (
        <>   
          
        <TrendingManga pageNumber={params.pageNumber} />
        </>
          );
};

export default Home;
