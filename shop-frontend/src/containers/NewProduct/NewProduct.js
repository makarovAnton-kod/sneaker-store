import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Paper } from "@mui/material";
import ProductForm from "../../components/ProductForm/ProductForm";
import { createProduct } from "../../store/actions/productsActions";
import { fetchCategories } from "../../store/actions/categoriesActions";
import { historyPush } from '../../store/actions/historyActions';

const NewProduct = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const error = useSelector(state => state.products.createProductsError);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const onProductFormSubmit = async productData => {
        await dispatch(createProduct(productData));
        dispatch(historyPush('/'));
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#1e1e1e',
            padding: '40px',
        }}>
            <Paper sx={{
                padding: '30px',
                backgroundColor: '#2c2c2c',
                borderRadius: '15px',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
                width: '100%',
                maxWidth: '600px',
            }}>
                <Typography
                    textAlign="center"
                    marginBottom="30px"
                    variant="h4"
                    sx={{
                        color: '#FF6347', // Яркий цвет для заголовка
                        fontFamily: 'Roboto, sans-serif', // Современный шрифт
                        fontWeight: 'bold',
                        textShadow: '3px 3px 8px rgba(0, 0, 0, 0.7)', // Усиленная тень для эффекта
                        textTransform: 'uppercase', // Заглавные буквы
                    }}
                >
                    Создание нового продукта
                </Typography>
                <ProductForm
                    categories={categories}
                    error={error}
                    onSubmit={onProductFormSubmit}
                    sx={{
                        backgroundColor: '#3c3c3c', // Более темный фон для формы
                        borderRadius: '10px', // Более округлые углы
                        padding: '25px', // Увеличенные внутренние отступы
                        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.4)', // Усиленная тень для формы
                        color: '#FFFFFF',
                    }}
                />
            </Paper>
        </Box>
    );
};

export default NewProduct;
