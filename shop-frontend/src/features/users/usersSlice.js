import { createSlice } from '@reduxjs/toolkit';
import { login, register } from './usersThunks';

const initialState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, { payload: data }) => {
      state.registerLoading = false;
      state.user = data.user;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload: data }) => {
      state.loginLoading = false;
      state.user = data.user;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
  }
});

export const { unsetUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

export const selectUser = (state) => state.users.user;
export const selectRegisterLoading = (state) => state.users.registerLoading;
export const selectRegisterError = (state) => state.users.registerError;
export const selectLoginLoading = (state) => state.users.loginLoading;
export const selectLoginError = (state) => state.users.loginError;
