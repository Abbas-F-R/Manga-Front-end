// src/api/mangaApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CommentResponse, MangaRequest, MangaFilter, MangaUpdate, PageResponse, CommentPageResponse, CommentFilter, CommentUpdate, CommentForm } from '../Types/interfaces';

export const CommentApi = createApi({
  reducerPath: 'CommentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5113/api',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
   }),
  endpoints: (builder) => ({
    getComments: builder.query<PageResponse<CommentPageResponse> , CommentFilter | void>({
      query: (filter?: CommentFilter) => {
        
        const params = new URLSearchParams();
        if (filter?.chapterId) params.append('ChapterId', filter.chapterId);
        params.append('PageNumber', filter?.pageNo?.toString() ?? '1');
        params.append('PageSize', filter?.pageSize?.toString() ?? '10'); // افتراضي هو 10

        return `Comment?${params.toString()}`;}

    }),
    addComment: builder.mutation<CommentResponse, CommentForm>({
      query: (manga: CommentForm) => ({
        url: `Comment`,
        method: 'POST',
        body: manga,
      }),
    }),
    updateComment: builder.mutation<CommentResponse, CommentUpdate>({
      query: (update:CommentUpdate ) => ({
        url: `Comment/${update.id}`,
        method: 'PUT',
        body: update.data,
      }),
    }),
    deleteComment: builder.mutation<CommentResponse, string>({
      query: (id: string) => ({
        url: `Comment/${id}`,
        method: 'DELETE',
      }),
    }),
   
  }),
});

export const {
 useAddCommentMutation,
 useGetCommentsQuery,
 useUpdateCommentMutation,
 useDeleteCommentMutation
} = CommentApi;
