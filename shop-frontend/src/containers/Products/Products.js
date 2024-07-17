import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Box, Grid} from "@mui/material";
import {fetchProducts} from "../../store/actions/productsActions";
import ProductItem from "../../components/ProductItem/ProductItem";
import ProductsLayout from "../../components/UI/Layout/ProductsLayout";

const Products = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.products.fetchLoading);
    const products = useSelector(state => state.products.products);
    const query = useLocation().search;

    useEffect(() => {
        dispatch(fetchProducts(query));
    }, [dispatch, query]);

    return (
        <ProductsLayout>
            <Grid container direction="column" spacing={2}>
                {loading
                    ? <Box sx={{textAlign: 'center'}}>Loading ...</Box>
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
        </ProductsLayout>

</Grid>
    );
};
export default Products;