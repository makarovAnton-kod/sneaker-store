import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { fetchCategories, deleteCategory } from '../../store/actions/categoriesActions';

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleDelete = async (categoryId) => {
        if (window.confirm('Вы уверены, что хотите удалить эту категорию?')) {
            await dispatch(deleteCategory(categoryId));
        }
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h5">Categories</Typography>
                </Grid>
                {user && user.role === 'admin' && (
                    <Grid item>
                        <Button color="primary" component={Link} to="/categories/new">
                            Add Category
                        </Button>
                    </Grid>
                )}
            </Grid>
            <Grid item container spacing={3}>
                {categories.map(category => (
                    <Grid item xs={12} sm={6} lg={3} key={category._id}>
                        <Box>
                            <Typography variant="h6">{category.title}</Typography>
                            <Typography variant="body2">{category.description}</Typography>
                            {user && user.role === 'admin' && (
                                <Box mt={2}>
                                    <Button
                                        component={Link}
                                        to={`/categories/edit/${category._id}`}
                                        variant="contained"
                                        color="info"
                                        sx={{ marginRight: '10px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(category._id)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default Categories;
