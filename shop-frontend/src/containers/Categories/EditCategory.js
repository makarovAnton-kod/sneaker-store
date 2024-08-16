import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography, Button, TextField, Grid } from '@mui/material';
import { fetchCategories, updateCategory } from '../../store/actions/categoriesActions';
import { historyPush } from '../../store/actions/historyActions';

const EditCategory = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const category = useSelector(state => state.categories.categories.find(c => c._id === id));
    const [categoryData, setCategoryData] = useState({
        title: '',
        description: '',
    });

    useEffect(() => {
        if (!category) {
            dispatch(fetchCategories());
        } else {
            setCategoryData({
                title: category.title,
                description: category.description || '',
            });
        }
    }, [dispatch, category]);

    const handleChange = e => {
        const { name, value } = e.target;
        setCategoryData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await dispatch(updateCategory(id, categoryData));
        dispatch(historyPush('/categories'));
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" textAlign="center" marginBottom="20px">Edit Category</Typography>
                <TextField
                    label="Title"
                    name="title"
                    value={categoryData.title}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={categoryData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" color="primary" variant="contained">Save Changes</Button>
            </form>
        </Grid>
    );
};

export default EditCategory;
