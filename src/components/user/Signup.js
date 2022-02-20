import axios from "axios";
import React from "react";
import { Form, Button } from "react-bootstrap";

const Signup = () => {
  const Auth_URL = "http://localhost:5000/api/auth";
  const submitHandler = async (e) => {
    e.preventDefault();
    const URL = Auth_URL + "/create-user";
    const data = {
      name: e.target[0].value,
      userName: e.target[2].value,
      gender: e.target[3].value,
      email: e.target[1].value,
      password: e.target[4].value,
    };
    console.log(data);
    const response = await axios.post(URL, data);
    localStorage.setItem("auth-token", response.data.authToken);
  };
  return (
    <>
      <div className="container w-50">
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>UserName</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
            <Form.Text className="text-muted">Must be unique.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAge">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="Enter Age Here" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Signup;
