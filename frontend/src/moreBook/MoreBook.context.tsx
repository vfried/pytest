import React, { createContext, useContext } from "react"
import { IMoreBookSlice } from "./MoreBook.slice";
import { useAppSelector } from "../store";


export const MoreBookContext = createContext<IMoreBookSlice>({} as IMoreBookSlice);

export const useMoreBookContext = () => useContext(MoreBookContext);

export function MoreBookContextWrapper({ children }: { children: React.ReactNode }) {

    const moreBooks = useAppSelector(state => state.moreBooks);

    return <MoreBookContext.Provider value={moreBooks}>
        {children}
    </MoreBookContext.Provider>
}