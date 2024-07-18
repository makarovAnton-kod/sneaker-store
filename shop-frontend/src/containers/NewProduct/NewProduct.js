import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import ProductForm from "../../components/ProductForm/ProductForm";
import {createProduct} from "../../store/actions/productsActions";
import {fetchCategories} from "../../store/actions/categoriesActions";
import {historyPush} from '../../store/actions/historyActions';

const NewProduct = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const error = useSelector(state => state.products.createProductsError);
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const onProductFormSubmit =async productData => {
        await dispatch(createProduct(productData));
        dispatch(historyPush('/'));
    };
    return (
        <>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                New product
            </Typography>
            <ProductForm
                categories={categories}
                error={error}
                onSubmit={onProductFormSubmit}
            />
        </>
    );
};
export default NewProduct;