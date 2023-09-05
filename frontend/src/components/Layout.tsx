import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import LibraryNavBar from './LibraryNavBar';

// Here we will create the general layout of the application
// Top menu bar, footer, etc
export default function Layout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <LibraryNavBar />
            <Container className="mt-5">
                <Outlet />
            </Container>
        </div >
    )
}