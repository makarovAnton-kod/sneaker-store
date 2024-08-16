import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchProduct, updateProduct } from "../../store/actions/productsActions";
import { fetchCategories } from "../../store/actions/categoriesActions"; // Импортируем действие для получения категорий
import ProductForm from "../../components/ProductForm/ProductForm";
import { Grid, CircularProgress } from "@mui/material";

const EditProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const product = useSelector(state => state.products.product);
    const categories = useSelector(state => state.categories.categories);
    const loading = useSelector(state => state.products.singleLoading);
    const categoriesLoading = useSelector(state => state.categories.loading); // Проверяем, загружаются ли категории
    const [formState, setFormState] = useState(null);

    useEffect(() => {
        dispatch(fetchProduct(id));
        dispatch(fetchCategories()); // Загружаем категории при монтировании компонента
    }, [dispatch, id]);

    useEffect(() => {
        if (product) {
            setFormState({
                title: product.title || "",
                price: product.price ? String(product.price) : "",
                description: product.description || "",
                category: product.category || "",
                image: product.image ? product.image : "",
            });
        }
    }, [product]);

    const handleSubmit = async (productData) => {
        await dispatch(updateProduct(id, productData));
        history.push('/');
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
            {loading || categoriesLoading || !formState ? (
                <CircularProgress />
            ) : (
                <ProductForm
                    onSubmit={handleSubmit}
                    categories={categories} // Передаем загруженные категории в форму
                    error={null}
                    initialData={formState}
                />
            )}
        </Grid>
    );
};

export default EditProduct;
