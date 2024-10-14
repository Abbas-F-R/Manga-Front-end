import React from 'react';
import ChapterForm from '../../../../components/ChapterForm'; // Adjust the import path based on your folder structure
interface ChapterProps {
  params:{
    mangaId: string;
  }
}
function AddChapterPage({params}: ChapterProps)  {
  return (
        <ChapterForm mangaId={params.mangaId} />
  );
};

export default AddChapterPage;
