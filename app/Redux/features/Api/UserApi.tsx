import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthResponse, LoginRequest, PageResponse, RegisterRequest, UserFilter, UserResponse, AddImageRequest } from '../Types/interfaces';


export const UserApi = createApi({
  reducerPath: 'UserApi',
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
    loginUser: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'Auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    registerUser: builder.mutation<AuthResponse, RegisterRequest>({
      query: (registerData) => ({
        url: 'Auth/register',
        method: 'POST',
        body: registerData,
      }),
    }),

    getUser: builder.query<UserResponse, string | null>({
      query: (username: string) => `Auth/user/${username}`
    }),

    deleteUser: builder.mutation<UserResponse, string>({
      query: (id: string) => `Auth/${id}`,
    }),

    getUsers: builder.query<PageResponse<UserResponse> , UserFilter>({
      query: (filter: UserFilter) =>
        `Chapter?pageSize=${filter?.PageSize ?? ''}&pageNo=${filter?.PageNumber ?? 1}&name=${filter.Name}`,
    }),

    addImageProfile: builder.mutation<UserResponse, AddImageRequest>({
      query: (data) => ({
        url: `user/imageProfile`,
        method: 'POST',
        body: data, 
      }),
    }),

    deleteImageProfile: builder.mutation<UserResponse, void>({
      query: () => ({
        url: `user/imageProfile`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { 
  useLoginUserMutation,
   useRegisterUserMutation,
    useGetUserQuery,
     useGetUsersQuery,
      useDeleteUserMutation,
       useAddImageProfileMutation,
        useDeleteImageProfileMutation
       } = UserApi;
