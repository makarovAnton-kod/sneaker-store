import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from "@mui/material";
import FileInput from "../UI/Form/FileInput/FileInput";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelect from "../UI/Form/FormSelect/FormSelect";
import { apiUrl } from "../../config";

const ProductForm = ({ onSubmit, categories, error, initialData }) => {
    const [state, setState] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
    });

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (initialData) {
            setState(initialData);
            if (initialData.image) {
                if (initialData.image.includes('fixtures')) {
                    setPreview(`${apiUrl}/${initialData.image}`);
                }
                setPreview(`${apiUrl}/images/${initialData.image}`);
            }
        }
    }, [initialData]);

    const submitFormHandler = async e => {
        e.preventDefault();
        await onSubmit({ ...state });
    };

    const inputChangeHandler = e => {
        const { name, value } = e.target;
        setState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const fileChangeHandler = e => {
        const file = e.target.files[0];
        setState(prevState => ({ ...prevState, image: file }));

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form autoComplete="off" onSubmit={submitFormHandler}>
            <Grid
                container
                maxWidth="md"
                textAlign="center"
                marginX="auto"
                direction="column"
                rowSpacing={2}
                sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '30px',
                    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
                }}
            >
                <FormSelect
                    label="Категория"
                    onChange={inputChangeHandler}
                    value={state.category}
                    name="category"
                    options={categories}
                    error={getFieldError('category')}
                    sx={{
                        color: '#333333',
                        '& .MuiInputBase-input': {
                            color: '#333333',
                        },
                        '& .MuiFormLabel-root': {
                            color: '#555555',
                        }
                    }}
                />
                <FormElement
                    label="Название"
                    onChange={inputChangeHandler}
                    value={state.title}
                    name="title"
                    error={getFieldError('title')}
                    sx={{
                        color: '#333333',
                        '& .MuiInputBase-input': {
                            color: '#333333',
                        },
                        '& .MuiFormLabel-root': {
                            color: '#555555',
                        }
                    }}
                />
                <FormElement
                    type="number"
                    label="Цена"
                    onChange={inputChangeHandler}
                    value={state.price ? String(state.price) : ""}
                    name="price"
                    error={getFieldError('price')}
                    sx={{
                        color: '#333333',
                        '& .MuiInputBase-input': {
                            color: '#333333',
                        },
                        '& .MuiFormLabel-root': {
                            color: '#555555',
                        }
                    }}
                />
                <FormElement
                    label="Описание"
                    onChange={inputChangeHandler}
                    value={state.description}
                    name="description"
                    error={getFieldError('description')}
                    sx={{
                        color: '#333333',
                        '& .MuiInputBase-input': {
                            color: '#333333',
                        },
                        '& .MuiFormLabel-root': {
                            color: '#555555',
                        }
                    }}
                />
                <Grid item>
                    <FileInput
                        label="Изображение"
                        name="image"
                        onChange={fileChangeHandler}
                        sx={{
                            color: '#333333',
                            '& .MuiInputBase-input': {
                                color: '#333333',
                            },
                            '& .MuiFormLabel-root': {
                                color: '#555555',
                            }
                        }}
                    />
                    {preview && (
                        <Grid item mt={2}>
                            <Typography sx={{ color: '#555555' }}>Предпросмотр изображения:</Typography>
                            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px', borderRadius: '10px' }} />
                        </Grid>
                    )}
                </Grid>
                <Grid item>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{
                            textTransform: 'uppercase',
                            backgroundColor: '#FF6347',
                            '&:hover': {
                                backgroundColor: '#FF4500',
                            },
                            padding: '12px 28px',
                            borderRadius: '30px',
                            fontWeight: 'bold',
                            boxShadow: '0px 8px 20px rgba(255, 99, 71, 0.4)',
                        }}
                    >
                        Сохранить
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;
