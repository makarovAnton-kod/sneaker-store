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
    });

    useEffect(() => {
        if (user && user._id) {
            setUserData({
                displayName: user.displayName,
                email: user.email,
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
            <List sx={{ backgroundColor: '#333333', borderRadius: '10px', padding: '10px' }}>
                {groupedOrders.map(order => (
                    <ListItem key={order.title} sx={{ padding: '10px', borderBottom: '1px solid #444444' }}>
                        <ListItemText
                            primary={`Товар: ${order.title}`}
                            secondary={`Цена: ${order.price} KGS - Количество: ${order.totalQuantity} - Сумма: ${order.totalPrice} KGS`}
                            primaryTypographyProps={{ sx: { color: '#FFD700', fontWeight: 'bold' } }} // Золотой цвет текста для основного текста
                            secondaryTypographyProps={{ sx: { color: '#FFFFFF' } }} // Белый цвет текста для второстепенного текста
                        />
                    </ListItem>
                ))}
            </List>
        );
    };

    if (!user) {
        return <Typography variant="h6">Пользователь не авторизован.</Typography>;
    }

    return (
        <Container maxWidth="md">
            <Paper
                elevation={3}
                sx={{
                    backgroundColor: '#2c2c2c', // Темный фон
                    padding: 3,
                    marginTop: 3,
                    color: '#FFFFFF', // Белый цвет текста
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: '#FFD700' }}>Мой профиль</Typography>
                {editMode ? (
                    <form noValidate autoComplete="off">
                        <TextField
                            label="Имя"
                            name="displayName"
                            value={userData.displayName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            sx={{
                                input: { color: '#FFFFFF' },
                                label: { color: '#FFD700' }, // Золотой цвет лейбла
                                fieldset: { borderColor: '#FFD700' } // Золотая рамка
                            }}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={userData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            sx={{
                                input: { color: '#FFFFFF' },
                                label: { color: '#FFD700' }, // Золотой цвет лейбла
                                fieldset: { borderColor: '#FFD700' } // Золотая рамка
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            sx={{
                                marginRight: 1,
                                backgroundColor: '#1e90ff',
                                color: '#FFFFFF',
                                '&:hover': {
                                    backgroundColor: '#1c86ee',
                                }
                            }}
                        >
                            Сохранить
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setEditMode(false)}
                            sx={{
                                backgroundColor: '#dc143c',
                                color: '#FFFFFF',
                                '&:hover': {
                                    backgroundColor: '#c11b22',
                                }
                            }}
                        >
                            Отмена
                        </Button>
                    </form>
                ) : (
                    <div>
                        <Typography variant="body1"><strong>Имя:</strong> {user.displayName}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                        <Button
                            variant="contained"
                            onClick={() => setEditMode(true)}
                            sx={{
                                marginTop: 2,
                                backgroundColor: '#1e90ff',
                                color: '#FFFFFF',
                                '&:hover': {
                                    backgroundColor: '#1c86ee',
                                }
                            }}
                        >
                            Редактировать
                        </Button>
                    </div>
                )}
            </Paper>
            <Paper
                elevation={3}
                sx={{
                    backgroundColor: '#2c2c2c', // Темный фон
                    padding: 3,
                    marginTop: 3,
                    color: '#FFFFFF', // Белый цвет текста
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ color: '#FFD700' }}>Мои заказы</Typography>
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
