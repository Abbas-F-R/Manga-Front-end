import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RateDto, RateForm } from "../Types/interfaces";




export const RateApi = createApi({
    reducerPath: 'RateApi',
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
        addRate: builder.mutation<RateDto, RateForm>({
         query: (rate: RateForm) => ({
            url: `Rate`,
            method: 'POST',
            body: rate,
            headers: {
                'Content-Type': 'application/json',
            },
          }),
        }),
      
    })
})

export const {useAddRateMutation} = RateApi;