import axiosApi from "../../axiosApi";
import { addNotification } from './notifierActions';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';
export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';
export const UPDATE_ORDER_REQUEST = 'UPDATE_ORDER_REQUEST';
export const UPDATE_ORDER_SUCCESS = 'UPDATE_ORDER_SUCCESS';
export const UPDATE_ORDER_FAILURE = 'UPDATE_ORDER_FAILURE';
export const DELETE_ORDER_REQUEST = 'DELETE_ORDER_REQUEST';
export const DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS';
export const DELETE_ORDER_FAILURE = 'DELETE_ORDER_FAILURE';

// Экшен для создания заказа
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

// Экшен для получения всех заказов
const fetchOrdersRequest = () => ({ type: FETCH_ORDERS_REQUEST });
const fetchOrdersSuccess = orders => ({ type: FETCH_ORDERS_SUCCESS, payload: orders });
const fetchOrdersFailure = error => ({ type: FETCH_ORDERS_FAILURE, payload: error });

export const fetchOrders = () => {
    return async dispatch => {
        dispatch(fetchOrdersRequest());
        try {
            const response = await axiosApi.get('/orders');
            dispatch(fetchOrdersSuccess(response.data));
        } catch (e) {
            dispatch(fetchOrdersFailure(e.message));
            dispatch(addNotification('Fetch orders failed!', 'error'));
        }
    };
};

// Экшен для обновления заказа
const updateOrderRequest = () => ({ type: UPDATE_ORDER_REQUEST });
const updateOrderSuccess = order => ({ type: UPDATE_ORDER_SUCCESS, payload: order });
const updateOrderFailure = error => ({ type: UPDATE_ORDER_FAILURE, payload: error });

export const updateOrder = (orderId, orderData) => {
    return async dispatch => {
        try {
            dispatch(updateOrderRequest());
            const response = await axiosApi.put(`/orders/${orderId}`, orderData);
            dispatch(updateOrderSuccess(response.data));
            dispatch(fetchOrders());
        } catch (e) {
            dispatch(updateOrderFailure(e.response ? e.response.data : e.message));
        }
    }
};

// Экшен для удаления заказа
const deleteOrderRequest = () => ({ type: DELETE_ORDER_REQUEST });
const deleteOrderSuccess = orderId => ({ type: DELETE_ORDER_SUCCESS, payload: orderId });
const deleteOrderFailure = error => ({ type: DELETE_ORDER_FAILURE, payload: error });

export const deleteOrder = (orderId) => {
    return async dispatch => {
        try {
            dispatch(deleteOrderRequest());
            await axiosApi.delete(`/orders/${orderId}`);
            dispatch(deleteOrderSuccess(orderId));
            dispatch(fetchOrders());
        } catch (e) {
            dispatch(deleteOrderFailure(e.response ? e.response.data : e.message));
        }
    }
};
