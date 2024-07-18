import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Alert, Avatar, Container, Grid, Link, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearRegisterErrors, registerUser } from "../../store/actions/usersActions";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";

const Register = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);

    const [user, setUser] = useState({
        email: '',
        password: '',
        displayName: '',
    });

    useEffect(() => {
        return () => {
            dispatch(clearRegisterErrors());
        }
    }, [dispatch]);

    const inputChangeHandler = e => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const submitFormHandler = async e => {
        e.preventDefault();
        await dispatch(registerUser({ ...user }));
    };

    const getFieldError = fieldName => {
        try {
            if (error && error.errors && error.errors[fieldName]) {
                return error.errors[fieldName].message;
            }
            return undefined;
        } catch (err) {
            console.error(err);
            return undefined;
        }
    };

    return (
        <Container maxWidth="xs">
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar style={{ margin: '8px', backgroundColor: 'blue' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h6">
                    Sign up
                </Typography>
                {error && (
                    <Alert severity="error" style={{ marginBottom: '16px' }}>
                        Error! {error.message}
                    </Alert>
                )}
                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={2}
                    style={{ marginTop: '8px' }}
                >
                    <FormElement
                        required={true}
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={inputChangeHandler}
                        error={getFieldError('email')}
                        style={{ marginBottom: '8px' }}
                    />

                    <FormElement
                        required={true}
                        label="Display Name"
                        name="displayName"
                        value={user.displayName}
                        onChange={inputChangeHandler}
                        error={getFieldError('displayName')}
                        style={{ marginBottom: '8px' }}
                    />

                    <FormElement
                        type="password"
                        required={true}
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                        error={getFieldError('password')}
                        style={{ marginBottom: '8px' }}
                    />

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            loading={loading}
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ margin: '16px 0' }}
                        >
                            Sign Up
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link component={RouterLink} to="/login">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Register;
