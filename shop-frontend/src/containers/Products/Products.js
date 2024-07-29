import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Grid, Typography} from "@mui/material";
import {fetchProducts} from "../../store/actions/productsActions";
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
                    <Typography variant="h5">
                        Products
                    </Typography>
                </Grid>
                {user && user.role === 'admin' && <Grid item>
                    <Button color="primary" component={Link} to="/products/new">
                        Add
                    </Button>
                </Grid>}
            </Grid>
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
    );
};
export default Products;