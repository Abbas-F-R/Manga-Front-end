import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FcLike } from "react-icons/fc";
import { useGetCommentsQuery } from '../Redux/features/Api/CommentApi';
import CommentFormC from './CommentForm';
import { useAddLikeMutation } from '../Redux/features/Api/LikeApi';
import { commentLikeVariants, commentListFormVariants, commentTextVariants } from '../Variants/CommentVariants';
import Spinner from './Loading';

interface CommentsSectionProps {
  chapterId: string; 
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ chapterId }) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); 
  const { data: commentsData, error, isLoading , refetch} = useGetCommentsQuery({
    chapterId: chapterId,
    pageNo: 1, 
    pageSize: 10,
  });

  const [addLike, { isLoading: likeIsLoading, error: likeError }] = useAddLikeMutation();

  
  const handleLikeToggle = async (commentId: string) => {
    try {
      await addLike(commentId).unwrap();
      refetch();  
    } catch (error) {
      console.error(`Failed to like comment:`, error); 
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      refetch();  
      setIsSubmitted(false); 
    }
  }, [isSubmitted, refetch]);

  if (isLoading) {
    return <Spinner />;
  }

  const data = commentsData?.data;

  // if (error) {
  //   return <div>حدث خطأ أثناء جلب التعليقات: </div>;
  // }

  return (
    <>
      <CommentFormC chapterId={chapterId} setIsSubmitted={setIsSubmitted} />
      <div className="max-w-xl mx-auto p-4">
        <h2 className="md:text-2xl font-bold mb-4 border-b-2 p-2 border-yellow-600 text-right ">التعليقات</h2>
        {data && data.length > 0 ? (
          <ul className="space-y-4">
              {data.map((comment, index) => (
                 <motion.li
                 key={comment.id}
                 className="flex justify-between items-start border border-sky-500 p-3 rounded-lg max-h-[200px] overflow-hidden shadow-md" 
                 variants={commentListFormVariants(0.1 * index)}
                 initial="hidden"
                 whileInView="visible"
                 exit="exit"
               >
                 <motion.div
                   variants={commentTextVariants}
                   className="flex-1 w-4/5"
                 >
                   <p className="h-fit max-w-full  ">{comment.commentText}</p>
                   <p className="text-gray-400 text-sm">{comment.createdAt}</p>
                 </motion.div>
                 <motion.div 
                   variants={commentLikeVariants} 
                   className="flex flex-col items-center"
                 >
                   <p className='flex items-center text-lg'>
                     <FcLike 
                       onClick={() => handleLikeToggle(comment.id)}
                       className={`m-1 `} 
                     /> 
                     {comment.likeCount?.toString()}
                   </p>
                 </motion.div>
               </motion.li>
              ))}
          </ul>
        ) : (
          <p className='w-full text-center sm:text-2xl text-red-500'>لا توجد تعليقات متاحة.</p>
        )}
      </div>
    </>
  );
};

export default CommentsSection;
