import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { AppBar, Grid, Toolbar, Typography, IconButton } from "@mui/material";
import Anonymous from "./Menu/Anonymous";
import UserMenu from "./Menu/UserMenu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "tss-react/mui";
import { FaShoppingBag, FaShoePrints } from 'react-icons/fa';

const useStyles = makeStyles()(theme => ({
    mainLink: {
        color: '#FF8C00', // Яркий оранжевый цвет для основной ссылки
        textDecoration: 'none',
        '&:hover': {
            color: '#FFD700', // Золотой цвет при наведении
            textShadow: '0px 0px 8px #FFD700', // Свечение при наведении
        },
    },
    staticToolbar: {
        marginBottom: theme.spacing(2),
        backgroundColor: '#333333', // Темный фон
    },
    appBar: {
        backgroundColor: '#000000', // Черный фон для AppBar
        boxShadow: '0 4px 10px rgba(255, 140, 0, 0.5)',
        marginBottom: '20px'// Оранжевый оттенок тени
    },
    toolbar: {
        padding: theme.spacing(1),
    },
    title: {
        fontFamily: 'Montserrat, sans-serif', // Современный шрифт
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#FFFFFF', // Белый цвет текста
        textTransform: 'uppercase', // Заглавные буквы
        letterSpacing: '2px', // Интервал между буквами
        display: 'flex',
        alignItems: 'center',
    },
    iconButton: {
        color: '#FF8C00', // Цвет иконок
        '&:hover': {
            color: '#FFD700', // Цвет при наведении
        },
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
                                    <FaShoePrints style={{ marginRight: '8px' }} />
                                    Sports
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton className={classes.iconButton} component={Link} to="/">
                                <FaShoppingBag size={24} />
                            </IconButton>
                            {user ? (
                                <UserMenu user={user} />
                            ) : (
                                <Anonymous />
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};

export default AppToolbar;
