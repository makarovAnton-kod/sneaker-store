import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from "@mui/material";
import FileInput from "../UI/Form/FileInput/FileInput";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelect from "../UI/Form/FormSelect/FormSelect";
import {apiUrl} from "../../config";

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
                if(initialData.image.includes('fixtures')){
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

        // Предпросмотр выбранного файла
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
                    backgroundColor: '#f0f0f0', // Светлый фон для лучшей читаемости
                    borderRadius: '10px', // Скругленные углы
                    padding: '20px', // Внутренние отступы
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Легкая тень
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
                        color: '#000000', // Черный цвет текста для контраста
                        '& .MuiInputBase-input': {
                            color: '#000000', // Черный цвет текста внутри input
                        },
                        '& .MuiFormLabel-root': {
                            color: '#333333', // Темно-серый цвет для лейблов
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
                        color: '#000000', // Черный цвет текста
                        '& .MuiInputBase-input': {
                            color: '#000000', // Черный цвет текста внутри input
                        },
                        '& .MuiFormLabel-root': {
                            color: '#333333', // Темно-серый цвет для лейблов
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
                        color: '#000000', // Черный цвет текста
                        '& .MuiInputBase-input': {
                            color: '#000000', // Черный цвет текста внутри input
                        },
                        '& .MuiFormLabel-root': {
                            color: '#333333', // Темно-серый цвет для лейблов
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
                        color: '#000000', // Черный цвет текста
                        '& .MuiInputBase-input': {
                            color: '#000000', // Черный цвет текста внутри input
                        },
                        '& .MuiFormLabel-root': {
                            color: '#333333', // Темно-серый цвет для лейблов
                        }
                    }}
                />
                <Grid item>
                    <FileInput
                        label="Изображение"
                        name="image"
                        onChange={fileChangeHandler}
                        sx={{
                            color: '#000000', // Черный цвет текста
                            '& .MuiInputBase-input': {
                                color: '#000000', // Черный цвет текста внутри input
                            },
                            '& .MuiFormLabel-root': {
                                color: '#333333', // Темно-серый цвет для лейблов
                            }
                        }}
                    />
                    {preview && (
                        <Grid item mt={2}>
                            <Typography>Предпросмотр изображения:</Typography>
                            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px' }} />
                        </Grid>
                    )}
                </Grid>
                <Grid item>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{
                            textTransform: 'uppercase', // Верхний регистр текста
                            backgroundColor: '#1e90ff', // Ярко-синий цвет кнопки
                            '&:hover': {
                                backgroundColor: '#1c86ee', // Цвет кнопки при наведении
                            },
                            padding: '10px 20px', // Внутренние отступы кнопки
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Тень для кнопки
                        }}
                    >
                        Сохранить изменения
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;
