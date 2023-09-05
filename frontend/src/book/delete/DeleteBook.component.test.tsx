import { render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import DeleteBook from "./DeleteBook.component"
import { useDeleteBookMutation } from "../../api/bookApi"

jest.mock("../../api/bookApi", () => ({
    useDeleteBookMutation: jest.fn().mockReturnValue([
        jest.fn(),
        { isLoading: false }
    ])
}))

describe("DeleteBook", () => {
    it("Should render the book", () => {
        const { getByRole } = setupWithProps()
        expect(getByRole("button", { name: /delete/i })).toBeDefined()
    })

    it("Should call to delete when clicked", async () => {
        const onDelete = jest.fn();
        jest.mocked(useDeleteBookMutation)
            .mockReturnValue([onDelete, { isLoading: false }] as any)
        const user = userEvent.setup()
        const { getByRole } = setupWithProps({ isbn: 455667 })
        await user.click(getByRole("button", { name: /delete/i }));
        expect(onDelete).toHaveBeenCalledTimes(1)
        expect(onDelete).toHaveBeenCalledWith(455667)
    })
})

function setupWithProps(props: Partial<{ isbn: number }> = {}) {
    return render(<DeleteBook isbn={123456789} {...props} />)
}