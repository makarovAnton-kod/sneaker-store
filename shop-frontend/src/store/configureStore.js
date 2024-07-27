import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import productsReducer from "./reducers/productsReducer";
import usersReducer, {initialState} from "./reducers/usersReducer";
import axiosApi from "../axiosApi";
import categoriesReducer from "./reducers/categoriesReducer";
import ordersReducer from './reducers/ordersReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    products: productsReducer,
    users: usersReducer,
    categories: categoriesReducer,
    orders: ordersReducer,

});
const persistedState = loadFromLocalStorage();
const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
);
store.subscribe(() => {
    saveToLocalStorage({
        users: {
            ...initialState,
            user: store.getState().users.user,
        }
    })
});
axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {}
    return config;
});
axiosApi.interceptors.response.use(res => res, e => {
    if (!e.response.data) {
        e.response = {data: {global: 'No internet!'}};
    }
    throw e;
});

export default store;