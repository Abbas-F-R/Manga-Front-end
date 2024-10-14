import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAddCommentMutation } from '../Redux/features/Api/CommentApi';
import { CommentForm } from '../Redux/features/Types/interfaces';

interface CommentFormProps {
  chapterId: string;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

const CommentFormC: React.FC<CommentFormProps> = ({ chapterId, setIsSubmitted }) => {
  const [commentText, setCommentText] = useState<string>('');
  const [addComment, { isLoading, isError, error }] = useAddCommentMutation(); 

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentText.trim()) {
      try {
        const newComment: CommentForm = { commentText, chapterId };
        await addComment(newComment).unwrap();
        setCommentText(''); 
        setIsSubmitted(true);
      } catch (error) {
        console.error('فشل إضافة التعليق: ', error);
      }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center m-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <textarea
        value={commentText}
        onChange={handleChange}
        placeholder="اكتب تعليقك..."
        rows={4}
        className="bg-sky-900 outline-none border-none rounded-lg p-2 resize-none w-full sm:w-3/4 lg:w-3/6 max-w-xl"
      />
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? 'جاري الإرسال...' : 'إرسال التعليق'}
      </button>
      {isError && <p className="p-2 text-red-500">فشل في إضافة التعليق:</p>}
    </motion.form>
  );
};

export default CommentFormC;
