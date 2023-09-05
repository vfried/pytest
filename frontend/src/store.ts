import { configureStore } from '@reduxjs/toolkit'
import { bookApi } from './service/bookApi'
import { apiService } from './service/api'
import { moreBooksReducer } from './moreBook/MoreBook.reducer'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const store = configureStore({
    reducer: {
        [apiService.reducerPath]: apiService.reducer,
        [bookApi.reducerPath]: bookApi.reducer,
        moreBooks: moreBooksReducer
        //books: booksReducer
        // users: usersReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiService.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {books: booksState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;