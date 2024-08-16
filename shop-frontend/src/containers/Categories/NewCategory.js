import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Button, TextField, Grid } from '@mui/material';
import { createCategory } from '../../store/actions/categoriesActions';
import { historyPush } from '../../store/actions/historyActions';

const NewCategory = () => {
    const dispatch = useDispatch();
    const [categoryData, setCategoryData] = useState({
        title: '',
        description: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setCategoryData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await dispatch(createCategory(categoryData));
        dispatch(historyPush('/categories'));
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" textAlign="center" marginBottom="20px">New Category</Typography>
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
                <Button type="submit" color="primary" variant="contained">Create</Button>
            </form>
        </Grid>
    );
};

export default NewCategory;
