import React from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Add = () => {
  return (
    <div>
      <div className="container mt-3">
        <div className="card p-4">
          <h4>Add Form</h4>
          <Link to="/">
            <button className="btn btn-success btn-sm m-2 px-3">Fetch</button>
          </Link>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Add;
