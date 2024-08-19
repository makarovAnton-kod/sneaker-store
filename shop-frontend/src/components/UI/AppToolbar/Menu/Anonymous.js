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
                    color: '#FFD700', // Золотой цвет текста
                    textShadow: '0px 0px 8px #FF4500', // Свечение текста
                    fontWeight: 'bold', // Жирный текст
                    '&:hover': {
                        color: '#FF4500', // Оранжево-красный цвет при наведении
                        textShadow: '0px 0px 10px #FF4500', // Усиленное свечение при наведении
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
                    color: '#FFD700', // Золотой цвет текста
                    textShadow: '0px 0px 8px #FF4500', // Свечение текста
                    fontWeight: 'bold', // Жирный текст
                    '&:hover': {
                        color: '#FF4500', // Оранжево-красный цвет при наведении
                        textShadow: '0px 0px 10px #FF4500', // Усиленное свечение при наведении
                    },
                }}
            >
                Вход
            </Button>
        </>
    );
};

export default Anonymous;
