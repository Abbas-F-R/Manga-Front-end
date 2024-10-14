
import MangaChapterList from "@/app/components/MangaChapterList";
import MangaDetails from "@/app/components/MangaDetails";

interface MangaParams{
    params: {
        id: string;
    }
}

function Manga({params}: MangaParams) {


    return(
      <>
      <MangaDetails mangaId={params.id} />       
      <MangaChapterList mangaId={params.id} />
  
      </>
)}

export default Manga;