import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const OrdersTable = ({ title, orders, onEditOrder, onDeleteOrder, isAdmin }) => (
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
            {title}
        </Typography>
        {orders.length > 0 ? (
            <TableContainer component={Paper} sx={{ backgroundColor: '#333333' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {isAdmin && <TableCell sx={{ color: '#f39c12' }}>Пользователь</TableCell>}
                            <TableCell sx={{ color: '#f39c12' }}>Товар</TableCell>
                            <TableCell sx={{ color: '#f39c12' }}>Количество</TableCell>
                            <TableCell sx={{ color: '#f39c12' }}>Общая сумма</TableCell>
                            {isAdmin && <TableCell sx={{ color: '#f39c12' }}>Действия</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order._id}>
                                {isAdmin && <TableCell sx={{ color: '#ffffff' }}>{order.userId.displayName}</TableCell>}
                                <TableCell sx={{ color: '#ffffff' }}>{order.productId.title}</TableCell>
                                <TableCell sx={{ color: '#ffffff' }}>{order.quantity}</TableCell>
                                <TableCell sx={{ color: '#ffffff' }}>{order.totalPrice} KGS</TableCell>
                                {isAdmin && (
                                    <TableCell>
                                        <IconButton onClick={() => onEditOrder(order)} color="primary">
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => onDeleteOrder(order._id)} color="secondary">
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
            <Typography variant="body1" sx={{ color: '#f4f4f4' }}>Заказы не найдены.</Typography>
        )}
    </Paper>
);

export default OrdersTable;
