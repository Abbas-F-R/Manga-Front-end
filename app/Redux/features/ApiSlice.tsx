// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { url } from 'inspector';


// interface ChapterRespons {
//     chapterNumber: number;
//     imagesPath: string[];
//     mangaId: string;
//   }
// interface CapterRequest {
//     chapterNumber: number;
//     imagesPath: string[];
//     mangaId: string;
// }
// interface ChapterFilter {
//     mangaId: string,
//      pageNo: number
// }
// interface ChapterUpdate {
//   data: CapterRequest
//   id: string
// }

// export const CaptersApi = createApi({
//   reducerPath: 'CaptersApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5113/api' }), 
//   endpoints: (builder) => ({
//     getById: builder.query({
//       query: (id: string) => `Chapter/${id}`,
//     }),
//     getAll: builder.query({
//         query: (filter?: ChapterFilter) => `chapter?mangaId=${filter?.mangaId}&pageNo=${filter?.pageNo}`
//     }),
//     create: builder.mutation({
//         query:(chapter: CapterRequest) => ({
//             url: `Chapter`,
//             method:"post",
//             body: {chapter}
//     }), 
//    }),
//    update: builder.mutation({
//     query:(update: ChapterUpdate ) => ({
//         url: `Chapter/${update.id}`,
//         method:"PUT",
//         body: update.data,

//       }), 
//     }),
//     delete: builder.mutation({
//     query:(id: string ) => ({
//       url: `Chapter/${id}`,
//       method:"DELETE"
//     }), 
//   }),
//   }),
// });

// export const { useGetByIdQuery, useGetAllQuery, useCreateMutation, useUpdateMutation, useDeleteMutation } = CaptersApi;


// interface MangaResponse {
//   name: string;
//   coverImage: string;
//   chapters: string[]; // Assuming chapters are represented by an array of chapter IDs or titles
// }

// interface MangaRequest {
//   name: string;
//   coverImage: string;
// }

// interface MangaFilter {
//   pageNo: number;
// }

// interface MangaUpdate {
//   data: MangaRequest;
//   id: string;
// }

// export const MangaApi = createApi({
//   reducerPath: 'MangaApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5113/api' }),
//   endpoints: (builder) => ({
//     getById: builder.query<MangaResponse, string>({
//       query: (id: string) => `Manga/${id}`,
//     }),
//     getAll: builder.query<MangaResponse[], MangaFilter | void>({
//       query: (filter?: MangaFilter) => `Manga?pageNo=${filter?.pageNo ?? 1}`,
//     }),
//     create: builder.mutation<void, MangaRequest>({
//       query: (manga: MangaRequest) => ({
//         url: `Manga`,
//         method: 'POST',
//         body: manga,
//       }),
//     }),
//     update: builder.mutation<void, MangaUpdate>({
//       query: (update: MangaUpdate) => ({
//         url: `Manga/${update.id}`,
//         method: 'PUT',
//         body: update.data,
//       }),
//     }),
//     delete: builder.mutation<void, string>({
//       query: (id: string) => ({
//         url: `Manga/${id}`,
//         method: 'DELETE',
//       }),
//     }),
//   }),
// });

// export const {
//   useGetByIdQuery,
//   useGetAllQuery,
//   useCreateMutation,
//   useUpdateMutation,
//   useDeleteMutation,
// } = MangaApi;
