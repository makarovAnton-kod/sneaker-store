import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
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
        <>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
                sx={{
                    color: '#FFD700', // Золотой цвет для заголовка
                    fontFamily: 'Arial, sans-serif', // Шрифт, подходящий для игр
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Тень для эффекта
                }}
            >
                Новый продукт
            </Typography>
            <ProductForm
                categories={categories}
                error={error}
                onSubmit={onProductFormSubmit}
                sx={{
                    backgroundColor: '#333', // Темный фон для формы
                    borderRadius: '8px', // Скругленные углы
                    padding: '20px', // Внутренние отступы
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Тень для формы
                }}
            />
        </>
    );
};

export default NewProduct;
