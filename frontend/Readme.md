Basic frontend for application

## Project configuration

1. Create package.json

2. Add config files:
- babelrc
- eslintrc.json
- gitignore
- .prettierignore
- .prettierrc
- .stylelint.js
- jestoconfig.ts
- tsconfig.json
- webpack.config.js --> here we have the dev server configuration

## The way to Hello World

1. Add initial files (Up to here we have a simple hello world application)

- index.tsx (entry point)

    ```
        import { StrictMode } from 'react';
        import { createRoot } from 'react-dom/client';
        import App from './src/App';


        const rootElement = document.getElementById('root');
        const root = createRoot(rootElement!);

        root.render(
            <StrictMode>
                <App />
        </StrictMode>);
    ```

- App.tsx (here we will add store, etc)

    ```
    const App = () => {
        return (
            <div className="App">
                Hello World!!!
            </div>
        );
    }

    export default App;
    ```

2. Add react router to index.tsx (as per react-router documentation)

- index.tsx --> we wrap the app in BowserRouter
    ```
        import { StrictMode } from 'react';
        import { createRoot } from 'react-dom/client';
        import {
            BrowserRouter,
        } from "react-router-dom";
        import App from './src/App';

        const rootElement = document.getElementById('root');
        const root = createRoot(rootElement!);

        root.render(
            <StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </StrictMode>);

    ```

- App.tsx --> We add the first routes (this could be extracted to a new file if it grows a lot)

    ```
    import { Container } from "@mui/material";
    import { Route, Routes } from "react-router-dom";
    import Layout from "./layout/Layout";

    const App = () => {
        return (
            <Container>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route
                            path="books"
                            element={<h1>Books</h1>}
                        />
                        <Route path="about" element={<h2>About</h2>} />
                    </Route>
                </Routes>
            </Container>
        );
    }

    export default App;
    ```

- Add Layout.tsx this is a wrapper whith a menu that contains routes to the different elements, also an Outlet element where this routes will be rendered

    ```
    import { Suspense } from 'react';
    import { Link, Outlet } from 'react-router-dom';
    import { Grid, MenuItem, MenuList, Skeleton } from "@mui/material";


    // Here we will create the general layout of the application
    // Top menu bar, footer, etc
    export default function Layout() {
        return (
            <Grid container>
                <Grid item xs={2}>
                    <MenuList>
                        <MenuItem>
                            <Link to={"/"}>Home</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to={"books"}>Books</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to={"about"}>About</Link>
                        </MenuItem>
                    </MenuList>
                </Grid>
                <Grid item xs={10}>
                    <Suspense fallback={<Skeleton />}>
                        <Outlet />
                    </Suspense>
                </Grid>
            </Grid>
        );
    } 
    ```

3. Add redux and the redux store

- Index
    ```
    import { StrictMode } from 'react';
    import { createRoot } from 'react-dom/client';
    import { Provider } from 'react-redux';
    import {
        BrowserRouter,
    } from "react-router-dom";
    import App from './src/App';
    import store from './src/store';

    const rootElement = document.getElementById('root');
    const root = createRoot(rootElement!);

    root.render(
        <StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </StrictMode>);
    ```

- store.ts
    ```
    import { configureStore } from '@reduxjs/toolkit'
    import { booksReducer } from './books/booksSlice'

    const store = configureStore({
        reducer: {
            books: booksReducer
            // users: usersReducer
        },
    })

    // Infer the `RootState` and `AppDispatch` types from the store itself
    export type RootState = ReturnType<typeof store.getState>

    // Inferred type: {books: booksState, users: UsersState}
    export type AppDispatch = typeof store.dispatch

    export default store;
    ````

- booksSlice.ts
    ```
    import { createSlice, PayloadAction } from "@reduxjs/toolkit"
    import { RootState } from "../store"

    // Define a type for the slice state
    interface BooksState {
        value: number
    }

    // Define the initial state using that type
    const initialState: BooksState = {
        value: 0,
    }

    export const booksSlice = createSlice({
        name: 'books',
        // `createSlice` will infer the state type from the `initialState` argument
        initialState,
        reducers: {
            increment: (state) => {
                state.value += 1
            },
            decrement: (state) => {
                state.value -= 1
            },
            // Use the PayloadAction type to declare the contents of `action.payload`
            incrementByAmount: (state, action: PayloadAction<number>) => {
                state.value += action.payload
            },
        },
    })


    ```

4. Fetch books from the backend: for this we will use redux-toolkit-query

- booksApi

    ```
    import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
    import Book from '../books/book';

    export const booksApi = createApi({
        reducerPath: 'booksApi',
        tagTypes: ['Book'],
        baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:5001/' }),
        endpoints: (builder) => ({
            getBooks: builder.query<Book[], void>({
                query: () => `books`,
                providesTags: ['Book']
            })
        }),
    });

    export const { useGetBooksQuery } = booksApi;
    ```

- booksComponent

    ```
    import { useGetBooksQuery } from "../api/booksApi";

    export default function BookList() {

        const { data, error } = useGetBooksQuery();

        if (error) {
            return error;
        }

        return "RENDER STUFF HERE"
    }
    ```

5. Add CRUD operations