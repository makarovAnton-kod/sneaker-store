import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from "tss-react/mui";
import { Alert, Avatar, Container, Grid, Link, Typography } from "@mui/material";
import { LockOpenOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearRegisterErrors, loginUser } from "../../store/actions/usersActions";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#FFD700 !important', // Золотой цвет аватара
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: `${theme.spacing(2, 0)} !important`,
        backgroundColor: '#FF4500', // Оранжево-красный цвет кнопки
        color: '#FFFFFF', // Белый цвет текста
        '&:hover': {
            backgroundColor: '#E03C00', // Более темный оттенок при наведении
        },
    },
    alert: {
        margin: theme.spacing(3, 0),
        width: '100%',
        backgroundColor: '#2C2F33', // Темный фон для ошибок
        color: '#FFFFFF', // Белый цвет текста ошибки
    },
    link: {
        color: '#FFD700', // Золотой цвет ссылки
        '&:hover': {
            color: '#FF4500', // Оранжево-красный цвет при наведении
            textShadow: '0px 0px 8px #FF4500', // Свечение при наведении
        },
    },
}));

const Login = () => {
    const { classes } = useStyles();
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
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlined />
                </Avatar>
                <Typography component="h1" variant="h6">
                    Вход
                </Typography>
                {error && (
                    <Alert severity="error" className={classes.alert}>
                        Ошибка! {error.message}
                    </Alert>
                )}
                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={2}
                >
                    <FormElement
                        required={true}
                        label="Электронная почта"
                        name="email"
                        value={user.email}
                        onChange={inputChangeHandler}
                    />
                    <FormElement
                        type="password"
                        required={true}
                        label="Пароль"
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                    />
                    <Grid item xs={12}>
                        <ButtonWithProgress
                            loading={loading}
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Войти
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link component={RouterLink} to="/register" className={classes.link}>
                            Или зарегистрируйтесь
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Login;
