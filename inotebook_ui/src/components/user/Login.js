import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const Auth_URL = "https://express-inotebook.herokuapp.com/api/auth";
  const submitHandler = async (e) => {
    e.preventDefault();
    const URL = Auth_URL + "/login";
    const data = {
      userName: e.target[0].value,
      password: e.target[1].value,
    };
    const response = await axios.post(URL, data);
    localStorage.setItem("auth-token", response.data.authToken);
    navigate("/");
  };
  const signUpHandler = (e) => {
    e.preventDefault();
    navigate("/signup");
  };
  return (
    <div className="container w-50">
      <h1>Login Page</h1>
      <hr />
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <hr />
      <h3>Do not have account?</h3>
      <Button variant="primary" onClick={signUpHandler}>
        SignUp
      </Button>
    </div>
  );
};

export default Login;
