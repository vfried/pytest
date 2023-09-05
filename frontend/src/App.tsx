import { Route, Routes } from "react-router-dom";
import BookForm from "./book/form/BookForm.component";
import BookList from "./book/BookList.component";
import Layout from "./components/Layout";
import 'bootstrap/dist/css/bootstrap.css';

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
                <Route path="about" element={<h2>About</h2>} />
            </Route>
        </Routes>
    );
}

export default App;


