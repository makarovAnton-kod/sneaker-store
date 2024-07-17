import React, {useState} from 'react';
import {Button, Grid} from "@mui/material";
import FileInput from "../UI/Form/FileInput/FileInput";
import FormElement from "../UI/Form/FormElement/FormElement";
import FormSelect from "../UI/Form/FormSelect/FormSelect";

const ProductForm = ({onSubmit, categories, error}) => {
    const [state, setState] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
    });
    const submitFormHandler = e => {
        e.preventDefault();
        onSubmit({...state});
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });
        onSubmit(formData);
    };
    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };
    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setState(prevState => ({...prevState, [name]: file}));
    };
    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };
    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid
                container
                maxWidth="md"
                textAlign="center"
                marginX="auto"
                direction="column"
                rowSpacing={2}
            >
                <FormSelect
                    label="Category"
                    onChange={inputChangeHandler}
                    value={state.category}
                    name="category"
                    options={categories}
                    error={getFieldError('category')}
                />
                <FormElement
                    label="Title"
                    onChange={inputChangeHandler}
                    value={state.title}
                    name="title"
                    error={getFieldError('title')}
                />
                <FormElement
                    type="number"
                    label="Price"
                    onChange={inputChangeHandler}
                    value={state.price}
                    name="price"
                    error={getFieldError('price')}
                />
                <FormElement
                    label="Description"
                    onChange={inputChangeHandler}
                    value={state.description}
                    name="description"
                    error={getFieldError('description')}
                />
                <Grid item>
                    <FileInput
                        label="Image"
                        name="image"
                        onChange={fileChangeHandler}
                    />
                </Grid>
                <Grid item>
                    <Button type="submit" color="primary" variant="contained">Create</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;