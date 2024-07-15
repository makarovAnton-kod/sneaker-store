import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { unsetUser } from './usersSlice';

// Асинхронная функция для регистрации пользователя
export const register = createAsyncThunk(
    'users/register',
    async (registerMutation, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post('/users', registerMutation);
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 422) {
                return rejectWithValue(e.response.data);
            }

            throw e;
        }
    }
);

// Асинхронная функция для входа пользователя
export const login = createAsyncThunk(
    'users/login',
    async (loginMutation, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post('/users/sessions', loginMutation);
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 422) {
                return rejectWithValue(e.response.data);
            }

            throw e;
        }
    }
);


// Асинхронная функция для выхода пользователя
export const logout = createAsyncThunk(
    'users/logout',
    async (_, { getState, dispatch }) => {
        const token = getState().users.user?.token;
        await axiosApi.delete('/users/sessions', { headers: { 'Authorization': 'Bearer ' + token } });
        dispatch(unsetUser());
    }
);
