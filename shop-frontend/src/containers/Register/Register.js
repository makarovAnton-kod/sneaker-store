import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Container, Grid, Typography, Box, TextField, Button, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearRegisterErrors, registerUser } from "../../store/actions/usersActions";

const Register = () => {
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
        };
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
        <Container maxWidth="md">
            <Box sx={{
                backgroundColor: '#1e1e1e',
                color: '#f5f5f5',
                borderRadius: '10px',
                padding: '40px',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
                marginTop: '50px',
                textAlign: 'center',
            }}>
                <Typography component="h1" variant="h4" sx={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginBottom: '30px',
                    color: '#FF6347',
                }}>
                    Регистрация нового пользователя
                </Typography>
                {error && (
                    <Alert severity="error" sx={{
                        backgroundColor: '#b71c1c',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        marginBottom: '20px',
                    }}>
                        Ошибка: {error.message}
                    </Alert>
                )}
                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={3}
                    justifyContent="center"
                >
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            required
                            label="Электронная почта"
                            name="email"
                            value={user.email}
                            onChange={inputChangeHandler}
                            error={Boolean(getFieldError('email'))}
                            helperText={getFieldError('email')}
                            variant="filled"
                            sx={{
                                backgroundColor: '#2c2c2c',
                                borderRadius: '5px',
                                input: { color: '#ffffff' },
                                label: { color: '#bbbbbb' },
                                marginBottom: '20px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            required
                            label="Имя пользователя"
                            name="displayName"
                            value={user.displayName}
                            onChange={inputChangeHandler}
                            error={Boolean(getFieldError('displayName'))}
                            helperText={getFieldError('displayName')}
                            variant="filled"
                            sx={{
                                backgroundColor: '#2c2c2c',
                                borderRadius: '5px',
                                input: { color: '#ffffff' },
                                label: { color: '#bbbbbb' },
                                marginBottom: '20px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            required
                            type="password"
                            label="Пароль"
                            name="password"
                            value={user.password}
                            onChange={inputChangeHandler}
                            error={Boolean(getFieldError('password'))}
                            helperText={getFieldError('password')}
                            variant="filled"
                            sx={{
                                backgroundColor: '#2c2c2c',
                                borderRadius: '5px',
                                input: { color: '#ffffff' },
                                label: { color: '#bbbbbb' },
                                marginBottom: '20px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: '#FF6347',
                                color: '#ffffff',
                                padding: '15px 30px',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                boxShadow: '0px 6px 20px rgba(255, 99, 71, 0.5)',
                                '&:hover': {
                                    backgroundColor: '#e03e20',
                                    boxShadow: '0px 8px 25px rgba(224, 62, 32, 0.7)',
                                },
                            }}
                            disabled={loading}
                        >
                            Зарегистрироваться
                        </Button>
                    </Grid>
                </Grid>
                <Typography sx={{ marginTop: '20px', color: '#bbbbbb' }}>
                    Уже есть аккаунт?{' '}
                    <Link component={RouterLink} to="/login" sx={{ color: '#FF6347', textDecoration: 'none', fontWeight: 'bold' }}>
                        Войти
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Register;
