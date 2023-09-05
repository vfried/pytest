import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const LibraryNavBar = (): React.ReactElement => {
    return (
        <Navbar bg="primary" variant="dark" collapseOnSelect expand="sm">
            <Container>
                <Navbar.Brand href="/">The book shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-toggle" />
                <Navbar.Collapse id="navbar-toggle">
                    <Nav className="me-auto">
                        <Nav.Link href="/#/">Home</Nav.Link>
                        <Nav.Link href="#/books">Books</Nav.Link>
                        <Nav.Link href="#/moreBooks">More Books</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default LibraryNavBar;