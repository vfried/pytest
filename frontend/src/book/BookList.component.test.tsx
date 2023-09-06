import { render } from "@testing-library/react";
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
            })).toBeVisible();

        expect(getByRole('link', {
                name: /add book/i
            })).toBeVisible();

        expect(getByRole('columnheader', {
                name: /isbn/i
            })).toBeVisible();

        expect(getByRole('columnheader', {
                name: /name/i
            })).toBeVisible();

        expect(getByRole('columnheader', {
                name: /price/i
            })).toBeVisible();

        expect(getByRole('columnheader', {
                name: /actions/i
            })).toBeVisible();

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
          })).toBeVisible();
        expect(getByRole('cell', {
            name: book.price.toString()
        })).toBeVisible();
        expect(getByRole('cell', {
            name: 'DeleteButton'
            })).toBeVisible();
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