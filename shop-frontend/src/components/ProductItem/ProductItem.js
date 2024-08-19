import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    Typography
} from "@mui/material";
import { ArrowForward, Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import imageNotAvailable from '../../assets/image-not-available.jpg';
import { deleteProduct } from "../../store/actions/productsActions";
import { apiUrl } from "../../config";

const ProductItem = ({ id, title, price, image }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    let cardImage = imageNotAvailable;
    if (image) {
        if(image.includes('fixtures')){
            cardImage = apiUrl + '/' + image;
        }else {
            cardImage = apiUrl + '/images/' + image;
        }
    }

    const handleDelete = async () => {
        if (window.confirm('Вы уверены, что хотите удалить эту игру?')) {
            await dispatch(deleteProduct(id));
        }
    };

    return (
        <Grid item xs={12} sm={6} lg={4}>
            <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, #1F1C2C, #928DAB)', // Градиентный фон
                borderRadius: '16px', // Закругленные углы
                overflow: 'hidden',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                '&:hover': {
                    transform: 'scale(1.05)', // Масштабирование при наведении
                    boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.25)', // Глубокая тень
                }
            }}>
                <CardHeader
                    title={
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                color: '#FFD700',
                                textAlign: 'center',
                                textShadow: '0px 0px 10px #FF4500', // Свечение текста
                                letterSpacing: '0.1em', // Расстояние между буквами
                                textTransform: 'uppercase', // Верхний регистр
                                animation: 'glow 1.5s infinite ease-in-out' // Анимация свечения
                            }}
                        >
                            {title}
                        </Typography>
                    }
                    sx={{
                        backgroundColor: '#1F1C2C', // Темный фон заголовка
                        borderBottom: '2px solid #FF4500', // Оранжевая полоса снизу
                        padding: '12px', // Увеличенные отступы
                        boxShadow: '0px 4px 15px rgba(255, 69, 0, 0.5)', // Тень заголовка
                        borderRadius: '12px 12px 0 0' // Закругленные верхние углы
                    }}
                />

                <CardMedia
                    title={title}
                    image={cardImage}
                    sx={{
                        paddingTop: '60%', // Более высокий блок изображения
                        backgroundSize: 'cover', // Обрезка изображения
                        backgroundPosition: 'center',
                        borderBottom: '3px solid #FF4500', // Оранжевая полоса внизу изображения
                    }}
                />

                <CardContent sx={{ padding: '24px', textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF4500', fontSize: '2rem', marginBottom: '8px' }}>
                        {price.toLocaleString()} <span style={{ fontSize: '1rem', verticalAlign: 'super', color: '#FFD700' }}>₽</span>
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#FFFFFF', fontStyle: 'italic' }}>
                        Лучшая цена для геймеров!
                    </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{ justifyContent: 'space-between', padding: '16px' }}>
                    <Button
                        component={Link}
                        to={`/products/${id}`}
                        variant="contained"
                        sx={{
                            backgroundColor: '#FF4500',
                            color: '#FFFFFF',
                            borderRadius: '8px',
                            textTransform: 'none',
                            padding: '8px 16px',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#E03C00',
                            }
                        }}
                    >
                        Подробнее
                    </Button>
                    {user && user.role === 'admin' && (
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                        }}>
                            <Button
                                component={Link}
                                to={`/edit/${id}`}
                                variant="contained"
                                color="secondary"
                                size="small"
                                startIcon={<Edit />}
                                sx={{
                                    backgroundColor: '#007BFF',
                                    color: '#FFFFFF',
                                    textTransform: 'none',
                                    padding: '6px 12px',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#0056b3',
                                    }
                                }}
                            >
                                Редактировать
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                startIcon={<Delete />}
                                onClick={handleDelete}
                                sx={{
                                    backgroundColor: '#FF4500',
                                    color: '#FFFFFF',
                                    textTransform: 'none',
                                    padding: '6px 12px',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#E03C00',
                                    }
                                }}
                            >
                                Удалить
                            </Button>
                        </div>
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
};

ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
};

export default ProductItem;
