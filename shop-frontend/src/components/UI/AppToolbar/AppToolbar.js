import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import Anonymous from "./Menu/Anonymous";
import UserMenu from "./Menu/UserMenu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()(theme => ({
    mainLink: {
        color: '#FFD700', // Золотой цвет для основной ссылки
        textDecoration: 'none',
        '&:hover': {
            color: '#FF4500', // Оранжево-красный цвет при наведении
            textShadow: '0px 0px 8px #FF4500', // Свечение при наведении
        },
    },
    staticToolbar: {
        marginBottom: theme.spacing(2),
        backgroundColor: '#2C2F33', // Темный фон
    },
    appBar: {
        backgroundColor: '#23272A', // Темно-серый фон AppBar
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', // Тень
    },
    toolbar: {
        padding: theme.spacing(1),
    },
    title: {
        fontFamily: 'Verdana, sans-serif',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#FFFFFF', // Белый цвет текста
        textTransform: 'uppercase', // Заглавные буквы
    },
}));
const AppToolbar = () => {
    const { classes } = useStyles(null);
    const user = useSelector(state => state.users.user);

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <ToastContainer />

                <Toolbar className={classes.toolbar}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h6" className={classes.title}>
                                <Link to="/" className={classes.mainLink}>
                                    Магазин Онлайн Игр
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            {user ? <UserMenu user={user}/> : <Anonymous/>}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};
export default AppToolbar;
