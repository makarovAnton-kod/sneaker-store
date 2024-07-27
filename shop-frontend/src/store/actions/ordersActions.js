import axiosApi from "../../axiosApi";
import {addNotification} from './notifierActions';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';
export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

const fetchOrdersRequest = () => ({ type: FETCH_ORDERS_REQUEST });
const fetchOrdersSuccess = orders => ({ type: FETCH_ORDERS_SUCCESS, payload: orders });
const fetchOrdersFailure = error => ({ type: FETCH_ORDERS_FAILURE, payload: error });

const createOrderRequest = () => ({ type: CREATE_ORDER_REQUEST });
const createOrderSuccess = order => ({ type: CREATE_ORDER_SUCCESS, payload: order });
const createOrderFailure = error => ({ type: CREATE_ORDER_FAILURE, payload: error });

export const createOrder = (orderData) => {
    return async dispatch => {
        try {
            dispatch(createOrderRequest());
            const response = await axiosApi.post('/orders', orderData);
            dispatch(createOrderSuccess(response.data));
        } catch (e) {
            dispatch(createOrderFailure(e.response ? e.response.data : e.message));
        }
    }
};
export const fetchOrders = (userId) => {
    return async dispatch => {
        dispatch(fetchOrdersRequest());
        try {
            const response = await axiosApi.get(`/orders/user/${userId}`);
            dispatch(fetchOrdersSuccess(response.data));
        } catch (e) {
            dispatch(fetchOrdersFailure(e.message));
            dispatch(addNotification('Fetch orders failed!', 'error'));
        }
    };
};
