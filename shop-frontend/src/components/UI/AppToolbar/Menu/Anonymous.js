import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Anonymous = () => {
    return (
        <>
            <Button
                component={Link}
                to="/register"
                color="inherit"
                sx={{
                    color: '#FFD700',
                    textShadow: '0px 0px 8px #FF4500',
                    fontWeight: 'bold',
                    '&:hover': {
                        color: '#FF4500',
                        textShadow: '0px 0px 10px #FF4500',
                    },
                }}
            >
                Регистрация
            </Button>
            <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{
                    color: '#FFD700',
                    textShadow: '0px 0px 8px #FF4500',
                    fontWeight: 'bold',
                    '&:hover': {
                        color: '#FF4500',
                        textShadow: '0px 0px 10px #FF4500',
                    },
                }}
            >
                Вход
            </Button>
        </>
    );
};

export default Anonymous;
