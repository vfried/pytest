import { Route, Routes } from "react-router-dom";
import BookForm from "./book/form/BookForm.component";
import BookList from "./book/BookList.component";
import Layout from "./components/Layout";
import 'bootstrap/dist/css/bootstrap.css';
import MoreBookList from "./moreBook/MoreBook.components";
import MoreBookForm from "./moreBook/form/BookForm.component";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<h1>Home</h1>} />
                <Route path="/books">
                    <Route index={true} element={<BookList />}></Route>
                    <Route path="form">
                        <Route path="add" element={<BookForm />} />
                        <Route path=":_isbn" element={<BookForm />} />
                    </Route>
                </Route>
                <Route path="moreBooks" >
                    <Route index={true} element={<MoreBookList />}></Route>
                    <Route path="form">
                        <Route path="add" element={<MoreBookForm />} />
                        <Route path=":_isbn" element={<MoreBookForm />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;


