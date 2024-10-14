import { useState } from "react";



interface ChapterImagesProps {
    path?: string[]
}

function ChapterImages({path}: ChapterImagesProps ) {


    return (
        <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 justify-items-center my-4 mx-2 w-11/12  sm:w-3/4 lg:w-3/6 max-w-3xl ">
        {path?.map((image, index) => (
          <img
            key={index} 
            className="w-full"
            src={`http://localhost:5113/${image}`}
            alt=""
          />
        ))}
        </div>
        </div>
    )
}

export default ChapterImages;