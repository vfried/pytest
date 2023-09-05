import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { useGetBooksQuery } from "../api/bookApi";
import BookList from "./BookList.component";

jest.mock("../api/bookApi", () => ({
    useGetBooksQuery: jest.fn().mockReturnValue({ data: [], error: undefined })
}));

jest.mock("./delete/DeleteBook.component", () => () => "DeleteButton")

describe("BookListTest", () => {

    beforeEach(() => {
        jest.mocked(useGetBooksQuery).mockClear();
    })

    it("Renders an empty list", () => {
        const { getByRole, queryByTestId } = setup();
        // screen.logTestingPlaygroundURL() --> logs the test background

        expect(getByRole('heading', {
                name: /book list/i
            })).toBeDefined();

        expect(getByRole('link', {
                name: /add book/i
            })).toBeDefined();

        expect(getByRole('columnheader', {
                name: /isbn/i
            })).toBeDefined();

        expect(getByRole('columnheader', {
                name: /name/i
            })).toBeDefined();

        expect(getByRole('columnheader', {
                name: /price/i
            })).toBeDefined();

        expect(getByRole('columnheader', {
                name: /actions/i
            })).toBeDefined();

        expect(queryByTestId("123456789")).toBeNull();
    });

    it("Renders a list", () => {
        const book = { name: "Test book", isbn: 123456789, price: 10.55 };
        jest.mocked(useGetBooksQuery)
            .mockReturnValueOnce({ data: [book], error: undefined } as any)
        const { getByRole, getByTestId } = setup();

        expect(getByTestId(book.isbn)).toBeDefined();
        expect(getByRole('cell', {
            name: book.name
          })).toBeDefined();
        expect(getByRole('cell', {
            name: book.price.toString()
        })).toBeDefined();
        expect(getByRole('cell', {
            name: 'DeleteButton'
            })).toBeDefined();
    });

    it("Renders error", () => {
        jest.mocked(useGetBooksQuery)
            .mockReturnValueOnce({ data: [], error: "OMG ERROR" } as any);
        const { getByTestId } = setup();
        expect(getByTestId("errorMessage"));
    });
});

function setup() {
    return render(<HashRouter><BookList /></HashRouter>)
}