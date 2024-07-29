import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Paper, Typography } from "@mui/material";
import { fetchProduct } from "../../store/actions/productsActions";
import { apiUrl } from '../../config';
import { createOrder } from "../../store/actions/ordersActions";
import { historyReplace } from '../../store/actions/historyActions';
import imageNotAvailable from "../../assets/image-not-available.jpg";
import intel from "../../assets/intel.jpeg";
import cpu from "../../assets/cpu.jpg";
import hdd from "../../assets/hdd.jpg";
import ncn from "../../assets/ncn.jpeg";

const Product = ({ match }) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);
    const userId = useSelector(state => state.users.user._id);
    useEffect(() => {
        dispatch(fetchProduct(match.params.id));
    }, [dispatch, match.params.id]);

    const handleOrder = async () => {
        const orderData = {
            productId: product._id,
            userId: userId,
            quantity: 1, // Если у вас есть выбор количества, замените на динамическое значение
            totalPrice: product.price // Или добавьте логику для вычисления общей суммы
        };
        await dispatch(createOrder(orderData));
        dispatch(historyReplace('/'));
    };

    let imageUrl = imageNotAvailable;
    if (product?.image) {
        if (product?.image.includes('intel')) {
            imageUrl = intel;
        } else if (product?.image.includes('cpu')) {
            imageUrl = cpu;
        } else if (product?.image.includes('hdd')) {
            imageUrl = hdd;
        }else if (product?.image.includes('ncn')) {
            imageUrl = ncn;
        } else {
            imageUrl = apiUrl + '/' + product?.image;
        }
    }

    return (
        product &&
        <Paper elevation={3} square sx={{ padding: "15px", display: 'column', width: '800px', textAlign: 'center' }}>
            <Typography variant="h3">{product.title}</Typography>
            <img src={imageUrl} alt="image" width='700px' />
            <Typography variant="h6" sx={{ textAlign: 'right' }}>
                <strong>{product.price} KGS</strong>
            </Typography>
            <Typography variant="body2">{product.description}</Typography>
            <div>
                <button
                    type="button"
                    style={{ padding: '10px', background: '#ccc', margin: '5px' }}
                    onClick={() => dispatch(historyReplace('/'))}
                >
                    Вернуться назад
                </button>
                <button
                    type="button"
                    style={{ padding: '10px', background: '#ccc' }}
                    onClick={handleOrder}
                >
                    Заказать
                </button>
            </div>
        </Paper>
    );
};

export default Product;
