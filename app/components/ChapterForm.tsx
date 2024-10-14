'use client'
import { ChangeEvent, FormEvent, useState } from "react";
import { useCreateChapterMutation } from "../Redux/features/Api/ChapterApi"; // Adjust the import based on your actual API hook
import { MdFileUpload } from "react-icons/md";
import { useFilesUploadMutation } from "../Redux/features/Api/FaileApi";
import { useRouter } from "next/navigation";

interface ChapterFormProps {
  mangaId: string;
}

const ChapterForm = ({ mangaId }: ChapterFormProps) => {

  const router = useRouter();

  const [chapterNumber, setChapterNumber] = useState<number | ''>('');
  const [imagesPaths, setImagesPaths] = useState<string[]>([]);

  const [createChapter, { isLoading, isError, error }] = useCreateChapterMutation();
  const [filesUpload] = useFilesUploadMutation();

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
      const fileResponse = await filesUpload(formData).unwrap(); // Send files to the API
      setImagesPaths(fileResponse); // Set image paths in state
      console.log('Uploaded files:', fileResponse);
    } catch (error) {
      console.error('Failed to upload files:', error);
      alert('Failed to upload files.');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (chapterNumber === '' || !mangaId || imagesPaths.length === 0) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Construct ChapterForm object
      const chapterRequest = {
        chapterNumber: chapterNumber,
        imagesPath: imagesPaths,
        mangaId: mangaId,
      };

      // Submit chapter details
      const response = await createChapter(chapterRequest).unwrap();

      // Reset form
      setChapterNumber('');
      setImagesPaths([]);
      router.push('Profile'); 
    } catch (err) {
      alert('Failed to create chapter');
    }
  };

  return (
    <div  className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 to-slate-950 px-4">
        
          <form
        onSubmit={handleSubmit}
        className="absolute text-sm grid grid-cols-1 gap-1 md:gap-4 xl:gap-6 justify-items-center top-1/4 bg-sky-950 rounded-2xl min-w-[330px] lg:w-2/5 md:w-2/4 py-6 max-w-[500px] hover:shadow-xl hover:shadow-sky-400 m-4 transition-all duration-500 ease-in-out transform hover:scale-105"
      >
        <div className="relative grid grid-cols-2 gap-x-6 gap-y-4 w-4/5">
        <h1 className="text-2xl font-bold mb-4 col-span-2">Add New Chapter</h1>
          <label htmlFor="chapterNumber" className="text-white self-center">
            Chapter Number:
          </label>
          <input
            id="chapterNumber"
            type="number"
            value={chapterNumber}
            onChange={(e) => setChapterNumber(Number(e.target.value))}
            className="appearance-none outline-none border-none rounded-lg bg-gray-950 h-10 px-3 col-span-2"
            placeholder="Enter chapter number"
          />
        </div>

        <div className="flex items-center justify-center w-4/5">
          <label htmlFor="files" className="text-white mr-1">Images:</label>
          <div className="relative flex items-center w-2/3 rounded-lg bg-gradient-to-l from-yellow-400 to-sky-600 h-10 pl-3 col-span-2 hover:text-black hover:bg-gradient-to-r hover:from-sky-800 hover:to-sky-300 hover:border-spacing-1 font-bold transition-all duration-300 ease-in">
            <input
              type="file"
              id="files"
              name="files"
              onChange={handleFileChange}
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <MdFileUpload className="text-black mr-2" />
            <span className="hover:text-black">Upload Images</span>
          </div>
        </div>

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

export default ChapterForm;
