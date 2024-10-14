'use client'
import { ChangeEvent, FormEvent, useState } from "react";
import { useCreateMangaMutation } from "../Redux/features/Api/MangaApi";
import { MangaRequest } from "../Redux/features/Types/interfaces";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { MdFileUpload } from "react-icons/md";
import { Status } from "../Redux/features/Types/enums";
import { useFilesUploadMutation } from "../Redux/features/Api/FaileApi";
import { useRouter } from "next/navigation";

const MangaForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const [status, setStatus] = useState<Status | ''>('');
  const [description, setDescription] = useState<string>('');
  const [coverImage, setCoverImage] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const [createManga, { isLoading, isError, error }] = useCreateMangaMutation();
  const [filesUpload] = useFilesUploadMutation();

  
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setter(event.target.value);
  };
   
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        uploadFiles(Array.from(files)); 
      }
    };
  
  const uploadFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file)); 

    try {
      const fileResponse = await filesUpload(formData).unwrap();
      const firstFilePath = fileResponse[0];
      setCoverImage(firstFilePath); 
    } catch (error) {
      console.error('Failed to upload files:', error);
      alert('Failed to upload files.');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !author || !artist || status === '' || !description || !coverImage) {
      alert('Please fill in all fields');
      return;
    }
    const mangaRequest: MangaRequest = {
      title,
      author,
      artist,
      status,
      coverImage: coverImage,
      description,
    };
    try {
      await createManga(mangaRequest).unwrap();
      setTitle('');
      setAuthor('');
      setStatus('');
      setDescription('');
      setCoverImage('');
      router.push('Profile'); 
    } catch (error) {
      // Assuming `error` is of type `any` and has a `data` property with `message`
      const errorMessage = (error as any).data?.message || '';
      alert(`Failed to create manga. ${errorMessage}`);  }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-800 to-slate-950 px-4">
      <form onSubmit={handleSubmit} className="absolute  text-sm grid grid-cols-1   gap-1 md:gap-4 xl:gap-6  justify-items-center bg-sky-950 rounded-2xl min-w-[360px]  lg:w-2/5 md:w-2/4  py-6 max-w-md hover:shadow-xl hover:shadow-sky-400  my-4  transition-all duration-500 ease-in-out transform hover:scale-105">
      <h2 className="text-2xl text-white font-semibold mb-4">Create Manga</h2>
        <div className=" relative grid grid-cols-3 gap-x-6 gap-y-4 w-4/5 ">
          <label htmlFor="title" className="text-white self-center">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleInputChange(setTitle)}
            className="outline-none  focus:border-b-2 border-sky-500 rounded-lg bg-gray-950 h-10 px-3 col-span-2 "
            placeholder="Enter title"
          />

          <label htmlFor="author" className="text-white self-center">Author:</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={handleInputChange(setAuthor)}
            className="outline-none focus:border-b-2 border-sky-500 rounded-lg bg-gray-950 h-10 px-3 col-span-2"
            placeholder="Enter author"
          />

          <label htmlFor="artist" className="text-white self-center">Artist:</label>
          <input
            id="artist"
            type="text"
            value={artist}
            onChange={handleInputChange(setArtist)}
            className="outline-none focus:border-b-2 border-sky-500 rounded-lg bg-gray-950 h-10 px-3 col-span-2"
            placeholder="Enter artist"
          />
          
          <label htmlFor="status" className="text-white self-center">Status:</label>
          <div 
          onClick={()=> setOpen(!open)}
          className=" relative flex items-center justify-between border-none rounded-lg bg-gradient-to-l from-gray-950 to-sky-600 h-10 pl-3 col-span-2 
          hover:bg-gradient-to-r hover:from-sky-800 hover:to-sky-300 hover:border-spacing-1 font-bold hover:border-black hover:text-black  transition-all duration-300 ease-in ">
                         {status !== '' ? Status[status] : "Manga Status"}
            { open
                   ? <div className=" flex items-center justify-between h-10 px-2 rounded-e-lg bg-black text-lg"><TiArrowSortedDown className=" text-sky-600" /></div>
                   : <div className=" flex items-center justify-between h-10 px-2 rounded-e-lg bg-black text-lg"><TiArrowSortedUp className=" text-sky-600" /></div>
            }
               <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}       
                  className="absolute inset-0 opacity-0 cursor-pointer outline-none  bg-orange-800 "
                >
                  <option value="" disabled hidden>Manga Status</option>
                  <option value={Status.NotStarted}>Not Started</option>
                  <option value={Status.InProgress}>In Progress</option>
                  <option value={Status.Completed}>Completed</option>
             </select>
          </div>
        </div>

        <div className="w-4/5">
          <label htmlFor="description" className="text-white">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleInputChange(setDescription)}
            className="outline-none focus:border-b-2 border-sky-500 rounded-lg bg-gray-950 h-24 w-full px-3 py-2 resize-none"
            placeholder="Enter description"
          />
        </div>

        <div className="flex items-center justify-center w-4/5">
          <label htmlFor="files" className="text-white mr-1">Cover Image:</label>
          <div className="relative flex items-center w-2/3 rounded-lg bg-gradient-to-l from-yellow-400  to-sky-600 h-10 pl-3 col-span-2  hover:text-black hover:bg-gradient-to-r hover:from-sky-800 hover:to-sky-300 hover:border-spacing-1 font-bold   transition-all duration-300 ease-in">
            <input
              type="file"
              id="files"
              name="files"
              onChange={handleFileChange}
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <MdFileUpload className="text-black mr-2 " />
            <span className=" hover:text-black">Upload Image</span>
          </div>
        </div>
        {isError ?
        <div className="text-red-800 text-xl font-bold ">
          <h1>{(error as any).data?.message || ""}</h1>
        </div>
        : <></>}

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-sky-950 text-white py-2 px-6 rounded-lg mt-4 hover:bg-blue-700 transition duration-500 ease-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MangaForm;
