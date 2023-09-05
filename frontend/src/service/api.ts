import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_URL = 'http://127.0.0.1:5001/'

export const apiService = createApi({
    reducerPath: 'book',
    tagTypes: ['Book'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    endpoints: () => ({}),
});