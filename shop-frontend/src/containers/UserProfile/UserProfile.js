import React from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';

const UserProfile = ({ userData, editMode, handleChange, handleSave, setEditMode }) => (
    <Paper elevation={3} sx={{
        padding: 3,
        marginTop: 3,
        backgroundColor: '#1b1b1b',
        color: '#f4f4f4',
        fontFamily: 'Press Start 2P, cursive',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
    }}>
        <Typography variant="h4" gutterBottom sx={{
            color: '#f39c12',
            textShadow: '2px 2px #000000',
        }}>
            Мои данные
        </Typography>
        {editMode ? (
            <form noValidate autoComplete="off">
                <TextField
                    label="Имя"
                    name="displayName"
                    value={userData.displayName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{
                        input: { color: '#f39c12', backgroundColor: '#333333' },
                        label: { color: '#f39c12' },
                        fieldset: { borderColor: '#f39c12' }
                    }}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{
                        input: { color: '#f39c12', backgroundColor: '#333333' },
                        label: { color: '#f39c12' },
                        fieldset: { borderColor: '#f39c12' }
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{
                        marginRight: 1,
                        marginTop: 2,
                        backgroundColor: '#3498db',
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: '#2980b9',
                        },
                        fontFamily: 'Press Start 2P, cursive',
                    }}
                >
                    Сохранить
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setEditMode(false)}
                    sx={{
                        marginTop: 2,
                        backgroundColor: '#e74c3c',
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: '#c0392b',
                        },
                        fontFamily: 'Press Start 2P, cursive',
                    }}
                >
                    Отмена
                </Button>
            </form>
        ) : (
            <div>
                <Typography variant="body1"><strong>Имя:</strong> {userData.displayName}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>
                <Button
                    variant="contained"
                    onClick={() => setEditMode(true)}
                    sx={{
                        marginTop: 2,
                        backgroundColor: '#3498db',
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: '#2980b9',
                        },
                        fontFamily: 'Press Start 2P, cursive',
                    }}
                >
                    Редактировать данные
                </Button>
            </div>
        )}
    </Paper>
);

export default UserProfile;
