import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Paper, Typography} from "@mui/material";
import {fetchProduct} from "../../store/actions/prodcutsActions";
const Product = ({match}) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);
    useEffect(() => {
        dispatch(fetchProduct(match.params.id));
    }, [dispatch, match.params.id]);
    return (
        product &&
        <Paper elevation={3} square sx={{padding: "15px"}}>
            <Typography variant="h5">{product.title}</Typography>
            <Typography variant="body1">
                <strong>{product.price} KGS</strong>
            </Typography>
            <Typography variant="body2">{product.description}</Typography>
        </Paper>
    );
};
export default Product;