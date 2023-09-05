import { useState, useCallback, useEffect, useMemo, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddBookMutation, useEditBookMutation, useGetBookQuery } from "../../service/bookApi";
import Book, { BookHook } from "../../book/book";
import moreBooksClient from "../../service/moreBooksApi";

export default function useMoreBookForm(_isbn: string | undefined): BookHook {

    const [name, setName] = useState("");
    const [isbn, setIsbn] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

    //const { data, isFetching } = useGetBookQuery(Number(_isbn), { skip: _isbn === undefined });
    const navigate = useNavigate();


    useLayoutEffect(() => {
        if (_isbn) {
            moreBooksClient.getMoreBook(_isbn).then((data) => {
                setName(data.name);
                setIsbn(data.isbn);
                setPrice(data.price);
            })
        }
    }, [_isbn]);


    const handleSubmit = useCallback(() => {
        _isbn !== undefined ?
            moreBooksClient.editMoreBook({ "name": name, "price": price, "isbn": isbn })
                .then(() => {
                    navigate("/moreBooks");
                })
            :
            moreBooksClient.addMoreBook({ "name": name, "price": price, "isbn": isbn })
                .then(() => {
                    navigate("/moreBooks");
                })
    }, [name, isbn, price, moreBooksClient, _isbn]);


    return {
        book: { name, isbn, price },
        setBook: { setName, setIsbn, setPrice },
        isLoading: false,// isLoading || isFetching || otherEditProps.isLoading,
        handleSubmit
    }
}