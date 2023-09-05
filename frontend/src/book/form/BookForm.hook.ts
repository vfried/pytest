import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddBookMutation, useEditBookMutation, useGetBookQuery } from "../../api/bookApi";
import { BookHook } from "../book";

export default function useBookForm(_isbn: string | undefined): BookHook {

    const [name, setName] = useState("");
    const [isbn, setIsbn] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [addBook, { isLoading }] = useAddBookMutation();
    const [editBook, { ...otherEditProps }] = useEditBookMutation();
    const { data, isFetching } = useGetBookQuery(Number(_isbn), { skip: _isbn === undefined });
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setName(data.name);
            setIsbn(data.isbn);
            setPrice(data.price);
        }
    }, [data]);

    const handleSubmit = useCallback(() => {
        _isbn !== undefined ?
            editBook({ "name": name, "price": price, "isbn": isbn })
                .then(() => {
                    navigate("/books");
                })
            :
            addBook({ "name": name, "price": price, "isbn": isbn })
                .then(() => {
                    navigate("/books");
                })
    }, [name, isbn, price, addBook, _isbn]);


    return {
        book: { name, isbn, price },
        setBook: { setName, setIsbn, setPrice },
        isLoading: isLoading || isFetching || otherEditProps.isLoading,
        handleSubmit
    }
}