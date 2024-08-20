import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import { fetchProduct } from "../../store/actions/productsActions";
import { apiUrl } from '../../config';
import { createOrder } from "../../store/actions/ordersActions";
import { historyReplace } from '../../store/actions/historyActions';
import imageNotAvailable from "../../assets/image-not-available.jpg";

const Product = ({ match }) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);
    const user = useSelector(state => state.users.user);
    const userId = user ? user._id : null;
    const [openDialog, setOpenDialog] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [orderData, setOrderData] = useState({
        address: '',
        comment: '',
        quantity: 1,
    });

    useEffect(() => {
        dispatch(fetchProduct(match.params.id));
    }, [dispatch, match.params.id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleOrder = () => {
        if (!userId) {
            setOpenDialog(true);
        } else {
            setShowOrderForm(true);
        }
    };

    const handleSubmitOrder = async () => {
        const newOrderData = {
            ...orderData,
            productId: product._id,
            userId: userId,
            totalPrice: product.price * orderData.quantity
        };

        await dispatch(createOrder(newOrderData));
        dispatch(historyReplace('/'));
    };

    const handleCloseDialog = (confirmed) => {
        setOpenDialog(false);
        if (confirmed) {
            dispatch(historyReplace('/register'));
        }
    };

    let imageUrl = imageNotAvailable;
    if (product && product.image) {
        if (product.image.includes('fixtures')) {
            imageUrl = apiUrl + '/' + product.image;
        } else {
            imageUrl = apiUrl + '/images/' + product.image;
        }
    }

    return (
        product && (
            <Paper elevation={6} square sx={{
                padding: "30px",
                maxWidth: '900px',
                margin: '30px auto',
                borderRadius: '20px',
                backgroundColor: '#f7f7f7',
                boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
            }}>
                <Typography variant="h2" gutterBottom sx={{
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center',
                    marginBottom: '20px'
                }}>
                    {product.title}
                </Typography>
                <Box sx={{ textAlign: 'center', marginBottom: '30px' }}>
                    <img src={imageUrl} alt={product.title} style={{
                        width: '80%',
                        maxWidth: '700px',
                        borderRadius: '15px',
                        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
                    }} />
                </Box>
                <Typography variant="h5" sx={{
                    textAlign: 'right',
                    marginBottom: '30px',
                    fontWeight: 'bold',
                    color: '#FF4500',
                }}>
                    {product.price} ₽
                </Typography>
                <Typography variant="body1" paragraph sx={{
                    color: '#555',
                    marginBottom: '30px',
                    lineHeight: '1.6',
                    fontSize: '1.1rem',
                    textAlign: 'justify',
                }}>
                    {product.description}
                </Typography>

                {showOrderForm ? (
                    <Box component="form" sx={{ marginTop: '30px' }}>
                        <TextField
                            label="Адрес доставки"
                            name="address"
                            value={orderData.address}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: '#333',
                                },
                                '& .MuiInputBase-input': {
                                    color: '#333',
                                },
                            }}
                        />
                        <TextField
                            label="Комментарий"
                            name="comment"
                            value={orderData.comment}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={3}
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: '#333',
                                },
                                '& .MuiInputBase-input': {
                                    color: '#333',
                                },
                            }}
                        />
                        <TextField
                            label="Количество"
                            name="quantity"
                            type="number"
                            value={orderData.quantity}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                            inputProps={{ min: 1 }}
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: '#333',
                                },
                                '& .MuiInputBase-input': {
                                    color: '#333',
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSubmitOrder}
                            sx={{
                                marginTop: '30px',
                                padding: '15px 30px',
                                backgroundColor: '#FF6347',
                                color: '#FFFFFF',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                '&:hover': {
                                    backgroundColor: '#FF4500',
                                    boxShadow: '0px 8px 20px rgba(255, 69, 0, 0.5)',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            Подтвердить заказ
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => dispatch(historyReplace('/'))}
                            sx={{
                                padding: '15px 30px',
                                backgroundColor: '#007BFF',
                                color: '#FFFFFF',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                '&:hover': {
                                    backgroundColor: '#0056b3',
                                    boxShadow: '0px 8px 20px rgba(0, 91, 179, 0.5)',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            Вернуться назад
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOrder}
                            sx={{
                                padding: '15px 30px',
                                backgroundColor: '#32CD32',
                                color: '#FFFFFF',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                '&:hover': {
                                    backgroundColor: '#228B22',
                                    boxShadow: '0px 8px 20px rgba(50, 205, 50, 0.5)',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            Заказать
                        </Button>
                    </Box>
                )}

                <Dialog
                    open={openDialog}
                    onClose={() => handleCloseDialog(false)}
                    PaperProps={{
                        sx: {
                            borderRadius: '20px',
                            padding: '20px',
                            backgroundColor: '#f0f0f0',
                            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.2)',
                        }
                    }}
                >
                    <DialogTitle sx={{
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        color: '#FF6347',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                    }}>
                        Вход необходим
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{
                            fontSize: '1.1rem',
                            color: '#333',
                            textAlign: 'center',
                            marginBottom: '20px',
                        }}>
                            Чтобы оформить заказ, пожалуйста, войдите в свою учетную запись. Если у вас ее еще нет, вы можете зарегистрироваться прямо сейчас.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'center' }}>
                        <Button
                            onClick={() => handleCloseDialog(false)}
                            sx={{
                                backgroundColor: '#FF6347',
                                color: '#FFFFFF',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                padding: '10px 20px',
                                '&:hover': {
                                    backgroundColor: '#FF4500',
                                }
                            }}
                        >
                            Нет
                        </Button>
                        <Button
                            onClick={() => handleCloseDialog(true)}
                            sx={{
                                backgroundColor: '#32CD32',
                                color: '#FFFFFF',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                padding: '10px 20px',
                                '&:hover': {
                                    backgroundColor: '#228B22',
                                }
                            }}
                        >
                            Да, перейти
                        </Button>
                    </DialogActions>
                </Dialog>

            </Paper>
        )
    );
};

export default Product;
