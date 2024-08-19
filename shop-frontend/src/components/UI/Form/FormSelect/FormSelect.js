import React from 'react';
import { MenuItem, TextField } from "@mui/material";

const FormSelect = ({ label, value, onChange, name, options = [], error }) => {
    return (
        <TextField
            select
            label={label}
            value={value}
            onChange={onChange}
            name={name}
            helperText={error}
            error={!!error}
            fullWidth
            variant="outlined"
        >
            {options.length > 0 ? (
                options.map(option => (
                    <MenuItem key={option._id} value={option._id}>
                        {option.title}
                    </MenuItem>
                ))
            ) : (
                <MenuItem disabled>Нет доступных категорий</MenuItem>
            )}
        </TextField>
    );
};

export default FormSelect;
