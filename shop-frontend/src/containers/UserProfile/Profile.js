import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, fetchUserOrders, fetchOrders } from "../../store/actions/ordersActions";
import { updateUser } from "../../store/actions/usersActions";
import { Container, Typography, Box, Paper } from '@mui/material';
import OrdersTable from './../Order/OrdersTable'; // Компонент для отображения заказов
import EditOrderDialog from './../Order/EditOrder/EditOrderDialog';
import UserProfile from "./UserProfile";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const orders = useSelector(state => state.orders.orders);
    const userOrders = useSelector(state => state.orders.userOrders);
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
                dispatch(fetchOrders());  // Получаем все заказы, если админ
            }
            dispatch(fetchUserOrders(user._id));  // Получаем заказы текущего пользователя
        }
    }, [dispatch, user]);

    const handleEditOrder = (order) => {
        setEditOrder(order);
    };

    const handleDeleteOrder = (orderId) => {
        if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
            dispatch(deleteOrder(orderId));
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSave = () => {
        dispatch(updateUser(user._id, userData));
        setEditMode(false);
    };

    return (
        <Container maxWidth="lg" sx={{ paddingTop: '30px' }}>
            <Paper sx={{
                padding: '20px',
                backgroundColor: '#2c2c2c',
                borderRadius: '15px',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
                marginBottom: '40px',
            }}>
                <Typography variant="h4" sx={{
                    color: '#FF6347',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                    textAlign: 'center',
                    textShadow: '3px 3px 8px rgba(0, 0, 0, 0.7)',
                }}>
                    Профиль пользователя
                </Typography>

                <UserProfile
                    userData={userData}
                    editMode={editMode}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    setEditMode={setEditMode}
                />
            </Paper>

            {user && user.role === 'admin' && (
                <Box sx={{
                    marginBottom: '40px',
                    padding: '20px',
                    backgroundColor: '#2c2c2c',
                    borderRadius: '15px',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
                }}>
                    <OrdersTable
                        title="Все заказы пользователей"
                        orders={orders}
                        onEditOrder={handleEditOrder}
                        onDeleteOrder={handleDeleteOrder}
                        isAdmin={true}
                    />
                </Box>
            )}

            <Box sx={{
                padding: '20px',
                backgroundColor: '#2c2c2c',
                borderRadius: '15px',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
            }}>
                <OrdersTable
                    title="Мои заказы"
                    orders={userOrders}
                    onEditOrder={handleEditOrder}
                    onDeleteOrder={handleDeleteOrder}
                />
            </Box>

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
