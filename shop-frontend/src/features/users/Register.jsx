import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRegisterError } from './usersSlice';
import { register } from './usersThunks';

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const getFieldError = (fieldName) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;

    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
    } catch (e) {
      // handle error
    }
  };

  return (
      <Container className="mt-5">
        <div className="d-flex flex-column align-items-center">
          <i className="bi bi-lock" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
          <h1 className="mb-3">Sign up</h1>
          <Form onSubmit={submitFormHandler} style={{ width: '100%' }}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={inputChangeHandler}
                  autoComplete="new-email"
                  isInvalid={Boolean(getFieldError('email'))}
              />
              <Form.Control.Feedback type="invalid">
                {getFieldError('email')}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={inputChangeHandler}
                  autoComplete="new-password"
                  isInvalid={Boolean(getFieldError('password'))}
              />
              <Form.Control.Feedback type="invalid">
                {getFieldError('password')}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
                type="submit"
                variant="primary"
                className="w-100"
                style={{ marginTop: '1rem', marginBottom: '2rem' }}
            >
              Sign Up
            </Button>
            <div className="text-center">
              <p>
                Already have an account?{' '}
                <RouterLink to="/login">Sign in</RouterLink>
              </p>
            </div>
          </Form>
        </div>
      </Container>
  );
};

export default Register;
