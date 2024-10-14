import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PageResponse, SearchFilter, SearchResponse } from "../Types/interfaces";

export const SearchApi = createApi({
  reducerPath: 'searchApi',
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
    search: builder.query<PageResponse<SearchResponse>, SearchFilter>({
      query: (filter) => {
        const params = new URLSearchParams();

        // Add search criteria to the query
        if (filter?.title) params.append("title", filter.title);
        params.append("PageNumber", "1");
        params.append("PageSize", "5");

        return `Search?${params.toString()}`;
      },
    }),
  }),
});

// تصدير الـ hooks التي تم إنشاؤها
export const { useSearchQuery } = SearchApi;
