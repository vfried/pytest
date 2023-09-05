import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Book from "../book/book";

const initialState = [] as Book[];

const moreBookSlice = createSlice({
    name: 'moreBooks',
    initialState,
    reducers: {
        setMoreBooks(state, action: PayloadAction<Book[]>) {
            state = action.payload;
            return state;
        },
        addBook(state, action: PayloadAction<Book>) {
            return [
                ...state,
                action.payload
            ]
        },
        editBook(state, action: PayloadAction<Book>) {
            return [
                ...state.filter(e => e.isbn !== action.payload.isbn),
                action.payload
            ]
        },
        deleteBook(state, action: PayloadAction<number>) {
            return [
                ...state.filter(e => e.isbn !== action.payload)
            ]
        },
    }
})
export const { setMoreBooks } = moreBookSlice.actions;
export const moreBooksReducer = moreBookSlice.reducer;