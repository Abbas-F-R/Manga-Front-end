import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  LikeResponse } from "../Types/interfaces";




export const LikeApi = createApi({
    reducerPath: 'LikeApi',
    baseQuery: fetchBaseQuery({ baseUrl:  'http://localhost:5113/api' ,
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
      addLike: builder.mutation<LikeResponse,   string>({
        query: (commentId: string ) => ({
            url: `Like/${commentId}`, 
            method: 'POST',
        }),
    }),
  })
})

export const {useAddLikeMutation} = LikeApi;