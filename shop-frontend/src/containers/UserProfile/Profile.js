import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteOrder, fetchOrders} from "../../store/actions/ordersActions";
import {updateUser} from "../../store/actions/usersActions";
import {
    Button,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import {Delete, Edit} from '@mui/icons-material';
import EditOrderDialog from './../Order/EditOrder/EditOrderDialog';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const orders = useSelector(state => state.orders.orders);
    const [editOrder, setEditOrder] = useState(null);
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
            if (user.role === 'admin') {
                dispatch(fetchOrders());
            }
            dispatch(fetchOrders(user._id));
        }
    }, [dispatch, user]);

    const handleEditOrder = (order) => {
        setEditOrder(order);
    };

    const handleDeleteOrder = async (orderId) => {
        await dispatch(deleteOrder(orderId));
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSave = async () => {
        await dispatch(updateUser(user._id, userData));
        setEditMode(false);
    };

    const adminOrders = orders.filter(order => order.userId._id !== user._id);
    const personalOrders = orders.filter(order => order.userId._id === user._id);

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{
                padding: 3,
                marginTop: 3,
                backgroundColor: '#1b1b1b', // Темный фон
                color: '#f4f4f4', // Светлый текст
                fontFamily: 'Press Start 2P, cursive', // Пиксельный шрифт
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)', // Тень
            }}>
                <Typography variant="h4" gutterBottom sx={{
                    color: '#f39c12', // Яркий акцент
                    textShadow: '2px 2px #000000', // Тень текста
                }}>
                    Мои данные
                </Typography>
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
                                input: { color: '#f39c12', backgroundColor: '#333333' }, // Яркий текст и темный фон input
                                label: { color: '#f39c12' }, // Яркий цвет лейбла
                                fieldset: { borderColor: '#f39c12' } // Яркая рамка
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
                                input: { color: '#f39c12', backgroundColor: '#333333' }, // Яркий текст и темный фон input
                                label: { color: '#f39c12' }, // Яркий цвет лейбла
                                fieldset: { borderColor: '#f39c12' } // Яркая рамка
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            sx={{
                                marginRight: 1,
                                marginTop: 2,
                                backgroundColor: '#3498db', // Яркий синий фон кнопки
                                color: '#ffffff', // Белый текст
                                '&:hover': {
                                    backgroundColor: '#2980b9', // Темный синий при наведении
                                },
                                fontFamily: 'Press Start 2P, cursive', // Пиксельный шрифт
                            }}
                        >
                            Сохранить
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setEditMode(false)}
                            sx={{
                                marginTop: 2,
                                backgroundColor: '#e74c3c', // Красный фон кнопки
                                color: '#ffffff', // Белый текст
                                '&:hover': {
                                    backgroundColor: '#c0392b', // Темный красный при наведении
                                },
                                fontFamily: 'Press Start 2P, cursive', // Пиксельный шрифт
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
                                backgroundColor: '#3498db', // Яркий синий фон кнопки
                                color: '#ffffff', // Белый текст
                                '&:hover': {
                                    backgroundColor: '#2980b9', // Темный синий при наведении
                                },
                                fontFamily: 'Press Start 2P, cursive', // Пиксельный шрифт
                            }}
                        >
                            Редактировать данные
                        </Button>
                    </div>
                )}
            </Paper>

            {user.role === 'admin' && (
                <Paper elevation={3} sx={{
                    padding: 3,
                    marginTop: 3,
                    backgroundColor: '#1b1b1b',
                    color: '#f4f4f4',
                    fontFamily: 'Press Start 2P, cursive',
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
                }}>
                    <Typography variant="h4" gutterBottom sx={{
                        color: '#f39c12',
                        textShadow: '2px 2px #000000',
                    }}>
                        Все заказы пользователей
                    </Typography>
                    {adminOrders.length > 0 ? (
                        <TableContainer component={Paper} sx={{ backgroundColor: '#333333' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: '#f39c12' }}>Пользователь</TableCell>
                                        <TableCell sx={{ color: '#f39c12' }}>Товар</TableCell>
                                        <TableCell sx={{ color: '#f39c12' }}>Количество</TableCell>
                                        <TableCell sx={{ color: '#f39c12' }}>Общая сумма</TableCell>
                                        <TableCell sx={{ color: '#f39c12' }}>Действия</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {adminOrders.map(order => (
                                        <TableRow key={order._id}>
                                            <TableCell sx={{ color: '#ffffff' }}>{order.userId.displayName}</TableCell>
                                            <TableCell sx={{ color: '#ffffff' }}>{order.productId.title}</TableCell>
                                            <TableCell sx={{ color: '#ffffff' }}>{order.quantity}</TableCell>
                                            <TableCell sx={{ color: '#ffffff' }}>{order.totalPrice} KGS</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleEditOrder(order)} color="primary">
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteOrder(order._id)} color="secondary">
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography variant="body1" sx={{ color: '#f4f4f4' }}>Заказы не найдены.</Typography>
                    )}
                </Paper>
            )}

            <Paper elevation={3} sx={{
                padding: 3,
                marginTop: 3,
                backgroundColor: '#1b1b1b',
                color: '#f4f4f4',
                fontFamily: 'Press Start 2P, cursive',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
            }}>
                <Typography variant="h4" gutterBottom sx={{
                    color: '#f39c12',
                    textShadow: '2px 2px #000000',
                }}>
                    Мои заказы
                </Typography>
                {personalOrders.length > 0 ? (
                    <TableContainer component={Paper} sx={{ backgroundColor: '#333333' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: '#f39c12' }}>Товар</TableCell>
                                    <TableCell sx={{ color: '#f39c12' }}>Количество</TableCell>
                                    <TableCell sx={{ color: '#f39c12' }}>Общая сумма</TableCell>
                                    {user.role === 'admin' && <TableCell sx={{ color: '#f39c12' }}>Действия</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {personalOrders.map(order => (
                                    <TableRow key={order._id}>
                                        <TableCell sx={{ color: '#ffffff' }}>{order.productId.title}</TableCell>
                                        <TableCell sx={{ color: '#ffffff' }}>{order.quantity}</TableCell>
                                        <TableCell sx={{ color: '#ffffff' }}>{order.totalPrice} KGS</TableCell>
                                        {user.role === 'admin' && (
                                            <TableCell>
                                                <IconButton onClick={() => handleEditOrder(order)} color="primary">
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteOrder(order._id)} color="secondary">
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography variant="body1" sx={{ color: '#f4f4f4' }}>У вас нет заказов.</Typography>
                )}
            </Paper>

            {editOrder && (
                <EditOrderDialog
                    open={!!editOrder}
                    onClose={() => setEditOrder(null)}
                    order={editOrder}
                />
            )}
        </Container>
    );
};

export default Profile;
