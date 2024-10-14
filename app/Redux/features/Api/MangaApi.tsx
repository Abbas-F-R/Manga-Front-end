// src/api/mangaApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MangaResponse, MangaRequest, MangaFilter, MangaUpdate, PageResponse, MangaPageResponse } from '../Types/interfaces';

export const MangaApi = createApi({
  reducerPath: 'MangaApi',
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
    getMangaById: builder.query<MangaResponse, string>({
      query: (id: string) => `Manga/${id}`,
    }),
    getMangas: builder.query<PageResponse<MangaPageResponse> , MangaFilter | void>({
      query: (filter?: MangaFilter) => {
        
        const params = new URLSearchParams();

        if (filter?.title) params.append('Title', filter.title);
        if (filter?.author) params.append('Author', filter.author);
        if (filter?.artist) params.append('Artist', filter.artist )
        if (filter?.userId) params.append('UserId', filter.userId);
        if (filter?.categoryId) params.append('CategoryId', filter.categoryId);
        if (filter?.status !== undefined) params.append('Status', filter.status.toString()); // تحويل enum إلى string
       
            // New filter parameters
       if (filter?.orderByViews !== undefined) params.append('OrderByViews', filter.orderByViews.toString());
       if (filter?.orderByUpdatingDate !== undefined) params.append('OrderByUpdatingDate', filter.orderByUpdatingDate.toString());
       if (filter?.yearOfIssue) params.append('YearOfIssue', filter.yearOfIssue);

        params.append('PageNumber', filter?.pageNo?.toString() ?? '1');
        params.append('PageSize', filter?.pageSize?.toString() ?? '10'); // افتراضي هو 10

        return `Manga?${params.toString()}`;}

    }),
    createManga: builder.mutation<MangaResponse, MangaRequest>({
      query: (manga: MangaRequest) => ({
        url: `Manga`,
        method: 'POST',
        body: manga,
      }),
    }),
    updateManga: builder.mutation<MangaResponse, MangaUpdate>({
      query: (update: MangaUpdate) => ({
        url: `Manga/${update.id}`,
        method: 'PUT',
        body: update.data,
      }),
    }),
    deleteManga: builder.mutation<MangaResponse, string>({
      query: (id: string) => ({
        url: `Manga/${id}`,
        method: 'DELETE',
      }),
    }),
    addCategoriesToManga: builder.mutation<MangaResponse, { id: string, categoryIds: string[] }>({
      query: ({ id, categoryIds }) => ({
        url: `AddCategoriesToManga/${id}`,
        method: 'POST',
        body: categoryIds,
      }),
    }),
  }),
});

export const {
  useGetMangaByIdQuery,
  useGetMangasQuery,
  useCreateMangaMutation,
  useUpdateMangaMutation,
  useDeleteMangaMutation,
} = MangaApi;
