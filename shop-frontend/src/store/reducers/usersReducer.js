import {CLEAR_REGISTER_ERRORS, REGISTER_USER_FAILURE} from "../actions/usersActions";
import {
    CLEAR_LOGIN_ERRORS,
     LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER,

    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
} from "../actions/usersActions";

export const initialState = {
    user: null,
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    fetchLoading: false,
    updateLoading: false,
    loginError: null,
};
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {...state, registerLoading: true};
        case REGISTER_USER_SUCCESS:
            return {...state, registerLoading: false, user: action.payload};
        case REGISTER_USER_FAILURE:
            return {...state, registerLoading: false, registerError: action.payload};
        case CLEAR_REGISTER_ERRORS:
            return {...state, registerError: null};
        case LOGIN_USER_REQUEST:
            return {...state, loginLoading: true};
        case LOGIN_USER_SUCCESS:
            return {...state, loginLoading: false, user: action.payload};
        case LOGIN_USER_FAILURE:
            return {...state, loginLoading: false, loginError: action.payload};
        case CLEAR_LOGIN_ERRORS:
            return {...state, loginError: null};
        case LOGOUT_USER:
            return {...state, user: null};
        case FETCH_USER_REQUEST:
            return { ...state, fetchLoading: true };
        case FETCH_USER_SUCCESS:
            return { ...state, fetchLoading: false, user: action.payload };
        case FETCH_USER_FAILURE:
            return { ...state, fetchLoading: false, error: action.payload };
        case UPDATE_USER_REQUEST:
            return { ...state, updateLoading: true };
        case UPDATE_USER_SUCCESS:
            return { ...state, updateLoading: false, user: action.payload };
        case UPDATE_USER_FAILURE:
            return { ...state, updateLoading: false, error: action.payload };
        default:
            return state;
    }
};
export default usersReducer;