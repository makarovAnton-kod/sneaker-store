import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
    Box
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
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
        if (window.confirm('Вы уверены, что хотите удалить эти кроссовки?')) {
            await dispatch(deleteProduct(id));
        }
    };

    return (
        <Grid item xs={12} sm={8} lg={6}>
            <Card sx={{
                display: 'flex',
                flexDirection: 'row',
                background: '#FFFFFF',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
                }
            }}>
                <Box sx={{
                    width: '60%',
                    height: 'auto',
                    background: `url(${cardImage}) no-repeat center center`,
                    backgroundSize: 'cover',
                }} />

                <CardContent sx={{ padding: '16px', width: '60%' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF4500', fontSize: '1.5rem', marginBottom: '8px' }}>
                        {price.toLocaleString()} <span style={{ fontSize: '1rem', verticalAlign: 'super', color: '#FFD700' }}>₽</span>
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', marginBottom: '16px' }}>
                        Стильные и удобные кроссовки для вашего повседневного образа.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            component={Link}
                            to={`/products/${id}`}
                            variant="contained"
                            sx={{
                                backgroundColor: '#FF6347', // Измененный яркий томатный цвет
                                color: '#FFFFFF',
                                borderRadius: '20px', // Более округлая форма кнопки
                                textTransform: 'uppercase', // Заглавные буквы для текста
                                padding: '12px 24px', // Увеличенные отступы для кнопки
                                fontWeight: 'bold',
                                boxShadow: '0px 4px 15px rgba(255, 99, 71, 0.5)', // Добавлена тень
                                '&:hover': {
                                    backgroundColor: '#FF4500', // Плавное изменение цвета при наведении
                                    boxShadow: '0px 6px 20px rgba(255, 69, 0, 0.7)', // Усиленная тень при наведении
                                    transform: 'scale(1.05)', // Легкое увеличение кнопки при наведении
                                }
                            }}
                        >
                            Смотреть
                        </Button>
                        {user && user.role === 'admin' && (
                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                <Button
                                    component={Link}
                                    to={`/edit/${id}`}
                                    variant="contained"
                                    size="small"
                                    startIcon={<Edit />}
                                    sx={{
                                        backgroundColor: '#007BFF',
                                        color: '#FFFFFF',
                                        borderRadius: '20px',
                                        textTransform: 'uppercase',
                                        padding: '10px 20px',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: '#0056b3',
                                            transform: 'scale(1.05)',
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
                                        backgroundColor: '#DC143C',
                                        color: '#FFFFFF',
                                        borderRadius: '20px',
                                        textTransform: 'uppercase',
                                        padding: '10px 20px',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: '#B22222',
                                            transform: 'scale(1.05)',
                                        }
                                    }}
                                >
                                    Удалить
                                </Button>
                            </Box>
                        )}
                    </Box>
                </CardContent>
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
