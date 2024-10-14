import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoryRequest, CategoryResponse, CategoryFilter, PageResponse } from '../Types/interfaces';

export const CategoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5113/api',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCategory: builder.mutation<CategoryResponse, CategoryRequest>({
      query: (newCategory) => ({
        url: 'Category',
        method: 'POST',
        body: newCategory,
      }),
    }),
    getCategories: builder.query<PageResponse<CategoryResponse>, CategoryFilter>({
      query: (filter = {}) => {
        const params = new URLSearchParams();
        if (filter.Name) params.append('Name', filter.Name);
        if (filter.PageNumber) params.append('PageNumber', filter.PageNumber.toString());
        if (filter.PageSize) params.append('PageSize', filter.PageSize.toString());

        return `Category?${params.toString()}`;
      },
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoriesQuery } = CategoryApi;
