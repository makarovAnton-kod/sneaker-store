import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Typography
} from "@mui/material";
import {fetchProduct} from "../../store/actions/productsActions";
import {apiUrl} from '../../config';
import {createOrder} from "../../store/actions/ordersActions";
import {historyReplace} from '../../store/actions/historyActions';
import imageNotAvailable from "../../assets/image-not-available.jpg";

const Product = ({ match }) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);
    const user = useSelector(state => state.users.user);
    const userId = user ? user._id : null;
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        dispatch(fetchProduct(match.params.id));
    }, [dispatch, match.params.id]);

    const handleOrder = async () => {
        if (!userId) {
            setOpenDialog(true);
            return;
        }

        const orderData = {
            productId: product._id,
            userId: userId,
            quantity: 1,
            totalPrice: product.price
        };
        await dispatch(createOrder(orderData));
        dispatch(historyReplace('/'));
    };

    const handleCloseDialog = (confirmed) => {
        setOpenDialog(false);
        if (confirmed) {
            dispatch(historyReplace('/register'));
        }
    };

    let imageUrl = imageNotAvailable;
    if (product.image) {
        if (product.image.includes('images')) {
            imageUrl = apiUrl + '/' + product.image;
        } else {
            imageUrl = apiUrl + '/images/' + product.image;
        }
    }

    return (
        product &&
        <Paper elevation={4} square sx={{ padding: "20px", maxWidth: '800px', margin: '20px auto' }}>
            <Typography variant="h3" gutterBottom>{product.title}</Typography>
            <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
                <img src={imageUrl} alt={product.title} style={{ width: '70%', maxWidth: '600px', borderRadius: '8px' }} />
            </Box>
            <Typography variant="h6" sx={{ textAlign: 'right', marginBottom: '20px', fontWeight: 'bold' }}>
                {product.price} KGS
            </Typography>
            <Typography variant="body1" paragraph>{product.description}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => dispatch(historyReplace('/'))}
                    sx={{ padding: '10px 20px' }}
                >
                    Вернуться назад
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOrder}
                    sx={{ padding: '10px 20px' }}
                >
                    Заказать
                </Button>
            </Box>
            <Dialog
                open={openDialog}
                onClose={() => handleCloseDialog(false)}
            >
                <DialogTitle>Необходимо авторизоваться</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Пожалуйста, авторизуйтесь, чтобы сделать заказ. Перейти на страницу регистрации?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialog(false)} color="primary">
                        Нет
                    </Button>
                    <Button onClick={() => handleCloseDialog(true)} color="primary" autoFocus>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default Product;
