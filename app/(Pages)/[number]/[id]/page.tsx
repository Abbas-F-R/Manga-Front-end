
import { useState } from "react";
import ChapterLinks from "../../../components/ChapterLinks";
import ChapterImages from "../../../components/ChapterImages";
import { useGetChapterByIdQuery, useGetChaptersQuery } from "../../../Redux/features/Api/ChapterApi";
import ChapterHead from "../../../components/ChapterHead";
import ChapterList from "../../../components/ChapterList";
import { ChapterPageResponse } from "@/app/Redux/features/Types/interfaces";
import Error from "@/app/components/Error";
import CommentsSection from "@/app/components/CommentsSection";
import Spinner from "@/app/components/Loading";


interface ChapterParams {
  params: {
    id: string;
    number: number;
  };
}

const nextAndPreviuosProps: ChapterPageResponse[] = [{id: "" , chapterNumber: 0,}]


function Chapter({params}: ChapterParams) {
    
  


  
  
 
   
    return(
      <>
        <ChapterLinks chapterId={params.id} chapterNumber={params.number}/>
     </>
    )
}
export default Chapter;