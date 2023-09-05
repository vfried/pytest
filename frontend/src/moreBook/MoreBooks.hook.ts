import { useEffect, useState } from "react";
import moreBooksClient from "../service/moreBooksApi";
import { useDispatch } from "react-redux";
import { setMoreBooks } from "./MoreBook.reducer";
import { useAppSelector } from "../store";

export default function useMoreBooks() {
    const distpatch = useDispatch();
    const moreBooks = useAppSelector(state => state.moreBooks);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setFetching(true);
        moreBooksClient.fetchMoreBooks().then((data) => {
            distpatch(setMoreBooks(data));
            setFetching(false);
        });
    }, []);

    return { moreBooks, fetching }
}