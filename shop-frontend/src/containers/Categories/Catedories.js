import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography, Paper } from '@mui/material';
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
        <Box sx={{
            padding: '40px',
            backgroundColor: '#1e1e1e',
            minHeight: '100vh',
        }}>
            <Grid container direction="column" spacing={4}>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" sx={{
                        color: '#FF6347',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
                    }}>
                        Категории
                    </Typography>
                    {user && user.role === 'admin' && (
                        <Button
                            component={Link}
                            to="/categories/new"
                            variant="contained"
                            sx={{
                                backgroundColor: '#32CD32',
                                color: '#FFFFFF',
                                padding: '10px 20px',
                                borderRadius: '20px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                boxShadow: '0px 4px 10px rgba(50, 205, 50, 0.5)',
                                '&:hover': {
                                    backgroundColor: '#228B22',
                                    boxShadow: '0px 6px 15px rgba(34, 139, 34, 0.7)',
                                },
                            }}
                        >
                            Добавить категорию
                        </Button>
                    )}
                </Grid>

                <Grid item container spacing={4}>
                    {categories.map(category => (
                        <Grid item xs={12} sm={6} lg={4} key={category._id}>
                            <Paper sx={{
                                padding: '20px',
                                backgroundColor: '#2c2c2c',
                                borderRadius: '15px',
                                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
                            }}>
                                <Typography variant="h6" sx={{
                                    color: '#FFD700',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    marginBottom: '10px',
                                }}>
                                    {category.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#dddddd', marginBottom: '20px' }}>
                                    {category.description}
                                </Typography>
                                {user && user.role === 'admin' && (
                                    <Box sx={{ display: 'flex', gap: '10px' }}>
                                        <Button
                                            component={Link}
                                            to={`/categories/edit/${category._id}`}
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#007BFF',
                                                color: '#FFFFFF',
                                                borderRadius: '20px',
                                                textTransform: 'uppercase',
                                                padding: '10px 20px',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    backgroundColor: '#0056b3',
                                                    boxShadow: '0px 4px 15px rgba(0, 123, 255, 0.5)',
                                                }
                                            }}
                                        >
                                            Редактировать
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            sx={{
                                                backgroundColor: '#DC143C',
                                                color: '#FFFFFF',
                                                borderRadius: '20px',
                                                textTransform: 'uppercase',
                                                padding: '10px 20px',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    backgroundColor: '#B22222',
                                                    boxShadow: '0px 4px 15px rgba(220, 20, 60, 0.5)',
                                                }
                                            }}
                                            onClick={() => handleDelete(category._id)}
                                        >
                                            Удалить
                                        </Button>
                                    </Box>
                                )}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Categories;
