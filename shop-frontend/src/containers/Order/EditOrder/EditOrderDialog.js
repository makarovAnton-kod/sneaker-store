import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import {updateOrder} from '../../../store/actions/ordersActions';

const EditOrderDialog = ({ open, onClose, order }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(order.quantity);
    const [totalPrice, setTotalPrice] = useState(order.totalPrice);

    const handleSubmit = async () => {
        const updatedOrder = {
            quantity,
            totalPrice
        };

        await dispatch(updateOrder(order._id, updatedOrder));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Редактирование заказа</DialogTitle>
            <DialogContent>
                <TextField
                    label="Количество"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Общая цена"
                    type="number"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Отмена
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditOrderDialog;
