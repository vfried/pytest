import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Book from '../book/book';

export const bookApi = createApi({
    reducerPath: 'book',
    tagTypes: ['Book'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:5001/',
    }),
    endpoints: (builder) => ({
        getBooks: builder.query<Book[], void>({
            query: () => `books`,
            providesTags: ['Book']
        }),
        getBook: builder.query<Book, number>({
            query: (isbn) => `books/${isbn}`
        }),
        addBook: builder.mutation<Book, Partial<Book>>({
            query: (book) => {
                return {
                    url: `books`,
                    method: 'POST',
                    body: book
                }
            },
            invalidatesTags: ['Book']
        }),
        editBook: builder.mutation<Book, Partial<Book>>({
            query: (book) => {
                return {
                    url: `books/${book.isbn}`,
                    method: 'PUT',
                    body: book
                }
            },
            invalidatesTags: ['Book']
        }),
        deleteBook: builder.mutation<void, number>({
            query: (isbn) => {
                return {
                    url: `books/${isbn}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Book']
        }),
    })
});

export const { useGetBooksQuery, useGetBookQuery, useAddBookMutation, useEditBookMutation, useDeleteBookMutation } = bookApi;