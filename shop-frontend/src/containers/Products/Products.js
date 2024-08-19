import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Typography } from "@mui/material";
import { fetchProducts } from "../../store/actions/productsActions";
import ProductItem from "../../components/ProductItem/ProductItem";

const Products = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.products.fetchLoading);
    const products = useSelector(state => state.products.products);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 'bold' }}>
                        Игры
                    </Typography>
                </Grid>
                {user && user.role === 'admin' && (
                    <Grid item>
                        <Button
                            color="primary"
                            component={Link}
                            to="/products/new"
                            sx={{
                                backgroundColor: '#FF4500',
                                color: '#FFFFFF',
                                '&:hover': {
                                    backgroundColor: '#E03C00',
                                },
                                marginRight: '10px',
                            }}
                        >
                            Добавить игру
                        </Button>
                        <Button
                            color="secondary"
                            component={Link}
                            to="/categories"
                            sx={{
                                backgroundColor: '#2C2F33',
                                color: '#FFFFFF',
                                '&:hover': {
                                    backgroundColor: '#23272A',
                                },
                            }}
                        >
                            Управление категориями
                        </Button>
                    </Grid>
                )}
            </Grid>
            {loading
                ? <Box sx={{ textAlign: 'center', color: '#FFFFFF' }}>Загрузка ...</Box>
                : <Grid item container spacing={3}>
                    {products.map(product => (
                        <ProductItem
                            key={product._id}
                            id={product._id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                        />
                    ))}
                </Grid>
            }
        </Grid>
    );
};

export default Products;
