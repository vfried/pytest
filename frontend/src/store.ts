import { configureStore } from '@reduxjs/toolkit'
import { bookApi } from './api/bookApi'

const store = configureStore({
    reducer: {
        [bookApi.reducerPath]: bookApi.reducer
        //books: booksReducer
        // users: usersReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {books: booksState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;