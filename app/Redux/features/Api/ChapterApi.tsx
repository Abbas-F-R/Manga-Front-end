// src/api/chaptersApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChapterResponse, ChapterRequest, ChapterFilter, ChapterUpdate, ChapterPageResponse, PageResponse } from '../Types/interfaces';

export const ChaptersApi = createApi({
  reducerPath: 'ChaptersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5113/api' ,
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      // If a token exists, set it in the headers
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChapterById: builder.query<ChapterResponse, string>({
      query: (id: string) => `Chapter/${id}`,
    }),
    getChapters: builder.query<PageResponse<ChapterPageResponse> , ChapterFilter | void>({
      query: (filter?: ChapterFilter) =>
        `Chapter?mangaId=${filter?.mangaId ?? ''}&pageNo=${filter?.pageNo ?? 1}`,
    }),
    createChapter: builder.mutation<ChapterResponse, ChapterRequest>({
      query: (chapter: ChapterRequest) => ({
        url: `Chapter`,
        method: 'POST',
        body: chapter,
      }),
    }),
    updateChapter: builder.mutation<void, ChapterUpdate>({
      query: (update: ChapterUpdate) => ({
        url: `Chapter/${update.id}`,
        method: 'PUT',
        body: update.data,
      }),
    }),
    deleteChapter: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `Chapter/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetChapterByIdQuery,
  useGetChaptersQuery,
  useCreateChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
} = ChaptersApi;
