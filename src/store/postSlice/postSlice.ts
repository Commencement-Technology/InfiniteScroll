import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
  endpoints: builder => ({
    getPosts: builder.query({
      query: (page = 1) => `/photos?_limit=10&_page=${page}`,
      serializeQueryArgs: ({endpointName}) => endpointName,
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const {useGetPostsQuery} = postsApi;
