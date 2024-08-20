import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Container, Grid, Typography, Box, TextField, Button, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearRegisterErrors, loginUser } from "../../store/actions/usersActions";

const Login = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.loginError);
    const loading = useSelector(state => state.users.loginLoading);
    const [user, setUser] = useState({
        email: '',
        password: '',
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
        await dispatch(loginUser({ ...user }));
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
                    color: '#32CD32',
                }}>
                    Вход в аккаунт
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
                                backgroundColor: '#32CD32',
                                color: '#ffffff',
                                padding: '15px 30px',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                boxShadow: '0px 6px 20px rgba(50, 205, 50, 0.5)',
                                '&:hover': {
                                    backgroundColor: '#228B22',
                                    boxShadow: '0px 8px 25px rgba(34, 139, 34, 0.7)',
                                },
                            }}
                            disabled={loading}
                        >
                            Войти
                        </Button>
                    </Grid>
                </Grid>
                <Typography sx={{ marginTop: '20px', color: '#bbbbbb' }}>
                    Еще нет аккаунта?{' '}
                    <Link component={RouterLink} to="/register" sx={{ color: '#32CD32', textDecoration: 'none', fontWeight: 'bold' }}>
                        Зарегистрируйтесь
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
