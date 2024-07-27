import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/actions/ordersActions";
import { fetchUser, updateUser } from "../../store/actions/usersActions";
import { TextField, Button, Container, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

// Функция для группировки заказов
const groupOrders = (orders) => {
    const groupedOrders = {};

    orders.forEach(order => {
        const productId = order.productId._id;
        if (!groupedOrders[productId]) {
            groupedOrders[productId] = {
                title: order.productId.title,
                price: order.productId.price,
                totalQuantity: 0,
                totalPrice: 0,
            };
        }
        groupedOrders[productId].totalQuantity++;
        groupedOrders[productId].totalPrice += order.productId.price;
    });

    const groupedOrdersArray = Object.values(groupedOrders).map(order => ({
        title: order.title,
        price: order.price,
        totalQuantity: order.totalQuantity,
        totalPrice: order.totalPrice,
    }));

    return groupedOrdersArray;
};

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const orders = useSelector(state => state.orders.orders);
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({
        displayName: '',
        email: '',
        // добавьте другие поля, которые нужно редактировать
    });

    useEffect(() => {
        if (user && user._id) {
            setUserData({
                displayName: user.displayName,
                email: user.email,
                // добавьте другие поля, которые нужно редактировать
            });
            dispatch(fetchOrders(user._id));
            dispatch(fetchUser(user._id));
        }
    }, [dispatch, user]);

    const handleChange = e => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSave = async () => {
        if (user && user._id) {
            const orderData = {
                userId: user._id,
                userData
            };
            await dispatch(updateUser(orderData));
            setEditMode(false);
        }
    };

    // Функция для отображения сгруппированных заказов
    const renderGroupedOrders = (groupedOrders) => {
        return (
            <List>
                {groupedOrders.map(order => (
                    <ListItem key={order.title}>
                        <ListItemText
                            primary={`Товар: ${order.title}`}
                            secondary={`Цена: ${order.price} KGS - Количество: ${order.totalQuantity} - Сумма: ${order.totalPrice} KGS`}
                        />
                    </ListItem>
                ))}
            </List>
        );
    };

    if (!user) {
        return <Typography variant="h6">User is not logged in.</Typography>;
    }

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h4" gutterBottom>Мой профиль</Typography>
                {editMode ? (
                    <form noValidate autoComplete="off">
                        <TextField
                            label="Имя"
                            name="displayName"
                            value={userData.displayName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={userData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        {/* Добавьте другие поля */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            sx={{ marginRight: 1 }}
                        >
                            Сохранить
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setEditMode(false)}
                        >
                            Отмена
                        </Button>
                    </form>
                ) : (
                    <div>
                        <Typography variant="body1"><strong>Имя:</strong> {user.displayName}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                        {/* Другие данные пользователя */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setEditMode(true)}
                            sx={{ marginTop: 2 }}
                        >
                            Редактировать
                        </Button>
                    </div>
                )}
            </Paper>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h5" gutterBottom>Мои заказы</Typography>
                {orders && orders.length > 0 ? (
                    renderGroupedOrders(groupOrders(orders))
                ) : (
                    <Typography variant="body1">У вас нет заказов.</Typography>
                )}
            </Paper>
        </Container>
    );
};

export default Profile;
