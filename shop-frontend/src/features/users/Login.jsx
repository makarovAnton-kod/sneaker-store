import React, { useState } from 'react';
import { Alert, Button, Container, Form, FormControl, FormGroup } from 'react-bootstrap';
import {Link, Link as RouterLink, useNavigate} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoginError } from './usersSlice';
import { login } from './usersThunks';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;

    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    navigate('/');
  };


  return (
      <Container className="d-flex flex-column align-items-center" style={{ marginTop: '8px' }}>
        <div className="text-center">
          <h1>Sign in</h1>
        </div>
        {error && (
            <Alert variant="danger" className="w-100" style={{ marginBottom: '20px' }}>
              {error.error}
            </Alert>
        )}

        <Form onSubmit={submitFormHandler} className="w-100">
          <FormGroup className="mb-3">
            <Form.Label>Email</Form.Label>
            <FormControl
                type="email"
                name="email"
                value={state.email}
                onChange={inputChangeHandler}
                autoComplete="current-email"
                placeholder="Enter email"
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label>Password</Form.Label>
            <FormControl
                type="password"
                name="password"
                value={state.password}
                onChange={inputChangeHandler}
                autoComplete="current-password"
                placeholder="Password"
            />
          </FormGroup>
          <Button type="submit" variant="primary" className="w-100 mb-3">
            Sign In
          </Button>
          <div className="text-center">
            <Link as={RouterLink} to="/register">
              Or sign up
            </Link>
          </div>
        </Form>
      </Container>
  );
};

export default Login;
