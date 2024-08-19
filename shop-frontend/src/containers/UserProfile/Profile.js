import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteOrder, fetchUserOrders, fetchOrders} from "../../store/actions/ordersActions";
import {updateUser} from "../../store/actions/usersActions";
import {Container} from '@mui/material';
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
        dispatch(deleteOrder(orderId));
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
        <Container maxWidth="lg">
            <UserProfile
                userData={userData}
                editMode={editMode}
                handleChange={handleChange}
                handleSave={handleSave}
                setEditMode={setEditMode}
            />

            {user && user.role === 'admin' && (
                <OrdersTable
                    title="Все заказы пользователей"
                    orders={orders}
                    onEditOrder={handleEditOrder}
                    onDeleteOrder={handleDeleteOrder}
                    isAdmin={true}
                />
            )}

            <OrdersTable
                title="Мои заказы"
                orders={userOrders}
                onEditOrder={handleEditOrder}
                onDeleteOrder={handleDeleteOrder}
            />

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
