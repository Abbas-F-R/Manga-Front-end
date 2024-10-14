import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';




export const FileApi = createApi({
    reducerPath: 'FileApi',
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
        filesUpload: builder.mutation<string[] , FormData>({
            query: (formData: FormData) => ({
                url: `File/Upload`,
                method: 'POST',
                body: formData,
              }),
        }),
    })

})

export const {
   
    useFilesUploadMutation
  } = FileApi;
  