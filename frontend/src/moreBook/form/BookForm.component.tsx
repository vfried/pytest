
import React from "react";
import { Form, Row, Button, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useBookForm from "./BookForm.hook";


export default function MoreBookForm() {

    const { _isbn } = useParams();

    const {
        book: { name, isbn, price },
        setBook: { setName, setIsbn, setPrice },
        isLoading, handleSubmit } = useBookForm(_isbn);

    return <React.Fragment>
        <h2 className="pb-3">{_isbn ? "Add" : "Edit"} Book</h2>
        <Form autoComplete="off" onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>ISBN</Form.Label>
                <Form.Control type="text" value={isbn} onChange={e => setIsbn(Number(e.target.value))} />
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
            </Form.Group>
            <Row className="pt-3">
                <Col className="text-end">
                    <Button disabled={isLoading} className="primary-outline me-2" href={"#/books"}>Back</Button>
                    <Button disabled={isLoading} type="submit">Submit</Button>
                </Col>
            </Row>
        </Form>
    </React.Fragment >
}