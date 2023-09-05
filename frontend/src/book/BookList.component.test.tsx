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
        const { container } = render(<HashRouter><BookList /></HashRouter>);
        // screen.logTestingPlaygroundURL() --> logs the test background
        expect(screen.queryByTestId("123456789")).toBeNull();
        //expect(container).toMatchSnapshot();
    });

    it("Renders a list", () => {
        jest.mocked(useGetBooksQuery)
            .mockReturnValueOnce({ data: [{ name: "Test book", isbn: 123456789, price: 10.55 }], error: undefined } as any)
        const { container } = render(<HashRouter><BookList /></HashRouter>);
        // screen.logTestingPlaygroundURL() --> logs the test background
        expect(screen.getByTestId("123456789")).toBeDefined();
        // expect(container).toMatchSnapshot();
    });

    it("Renders error", () => {
        jest.mocked(useGetBooksQuery)
            .mockReturnValueOnce({ data: [], error: "OMG ERROR" } as any);
        const { container } = render(<HashRouter><BookList /></HashRouter>);
        // screen.logTestingPlaygroundURL() --> logs the test background
        expect(screen.getByTestId("errorMessage"));
        // expect(container).toMatchSnapshot();
    });

});