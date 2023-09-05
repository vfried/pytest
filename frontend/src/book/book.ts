export default interface Book {
    name: string,
    price: number,
    isbn: number
}

export interface BookHook {
    book: Book,
    setBook: {
        setName: (name: string) => void,
        setPrice: (price: number) => void,
        setIsbn: (isbn: number) => void
    },
    isLoading: boolean,
    handleSubmit: () => void,
}

export interface FormType {
    mode: "ADD" | "EDIT",
    isbn: string | undefined
}