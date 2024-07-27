import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {addNotification} from './notifierActions';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const CLEAR_REGISTER_ERRORS = 'CLEAR_REGISTER_ERRORS';
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';
export const LOGOUT_USER = 'LOGOUT_USER';

const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, payload: user});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, payload: error});
export const clearRegisterErrors = () => ({type: CLEAR_REGISTER_ERRORS});

const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, payload: user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, payload: error});
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });
const fetchUserSuccess = user => ({ type: FETCH_USER_SUCCESS, payload: user });
const fetchUserFailure = error => ({ type: FETCH_USER_FAILURE, payload: error });

const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST });
const updateUserSuccess = user => ({ type: UPDATE_USER_SUCCESS, payload: user });
const updateUserFailure = error => ({ type: UPDATE_USER_FAILURE, payload: error });

export const fetchUser = (userId) => {
    return async dispatch => {
        dispatch(fetchUserRequest());
        try {
            const response = await axiosApi.get(`/users/${userId}`);
            dispatch(fetchUserSuccess(response.data));
        } catch (e) {
            dispatch(fetchUserFailure(e.message));
        }
    };
};

export const updateUser = (userData) => {
    return async dispatch => {
        dispatch(updateUserRequest());
        try {
            const response = await axiosApi.put(`/users/${userData.userId}`, userData.userData);
            dispatch(updateUserSuccess(response.data));
            dispatch(addNotification('Profile updated successfully!', 'success'));
        } catch (e) {
            dispatch(updateUserFailure(e.message));
            dispatch(addNotification('Failed to update profile!', 'error'));
        }
    };
};
export const registerUser = userData => {
    return async dispatch => {
        try {
            dispatch(registerUserRequest());

            const response = await axiosApi.post('/users', userData);
            await dispatch(registerUserSuccess(response.data.user));
            dispatch(historyPush('/'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(registerUserFailure(e.response.data));
            } else {
                dispatch(registerUserFailure({global: 'No internet'}));
            }
        }
    };
};
export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());
            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data.user));
            dispatch(historyPush('/'));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(loginUserFailure(e.response.data));
            } else {
                dispatch(loginUserFailure({global: 'No internet'}));
            }
        }
    };
};
export const logoutUser = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {'Authorization': token};
            await axiosApi.delete('/users/sessions', {headers});
            dispatch({type: LOGOUT_USER});
            dispatch(historyPush('/'));
        } catch (e) {
        }
    }
};