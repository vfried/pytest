import Book from "../book/book";
import { API_URL } from "./api"

function fetchMoreBooks(): Promise<Book[]> {
    return fetch(API_URL + "books")
        .then(response => {
            return response.json();
        })
}

function getMoreBook(_isbn: string): Promise<Book> {
    return fetch(API_URL + "books/" + _isbn)
        .then(response => {
            return response.json();
        })
}

function addMoreBook(book: Book): Promise<void> {
    return fetch(
        API_URL + "books/" + book.isbn, {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            book
        }),
    }).then(response => response.json())
}


function editMoreBook(book: Book): Promise<void> {
    return fetch(
        API_URL + "books/" + book.isbn, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            book
        }),
    }).then(response => response.json())
}


const moreBooksClient = { fetchMoreBooks, getMoreBook, editMoreBook, addMoreBook }

export default moreBooksClient;