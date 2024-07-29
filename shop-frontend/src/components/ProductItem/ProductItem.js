import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton} from "@mui/material";
import {ArrowForward} from "@mui/icons-material";
import imageNotAvailable from '../../assets/image-not-available.jpg';
import cpu from '../../assets/cpu.jpg';
import hdd from '../../assets/hdd.jpg';
import intel from '../../assets/intel.jpeg';
import ncn from '../../assets/ncn.jpeg';
import {apiUrl} from "../../config";
const ProductItem = ({id, title, price, image}) => {
    let cardImage = imageNotAvailable;
    if (image) {
        if (image.includes('intel')) {
            cardImage = intel;
        } else if (image.includes('cpu')) {
            cardImage = cpu;
        } else if (image.includes('hdd')) {
            cardImage = hdd;
        }else if (image.includes('ncn')) {
            cardImage = ncn;
        } else {
            cardImage = apiUrl + '/' + image;
        }
    }
    return (
        <Grid item xs={12} sm={6} lg={3}>
            <Card sx={{height: '100%'}}>
                <CardHeader title={title}/>
                <CardMedia
                    title={title}
                    image={cardImage}
                    sx={{paddingTop: '56.25%', height: 0}}
                />
                <CardContent>
                    <strong>
                        Price: {price} KGS
                    </strong>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/products/' + id}>
                        <ArrowForward />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};
ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string
};
export default ProductItem;