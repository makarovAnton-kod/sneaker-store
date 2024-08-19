import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE,
    FETCH_USER_ORDERS_REQUEST,
    FETCH_USER_ORDERS_SUCCESS,
    FETCH_USER_ORDERS_FAILURE,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
} from "../actions/ordersActions";

const initialState = {
    orders: [], // Все заказы (для админа)
    userOrders: [], // Заказы текущего пользователя
    order: null,
    orderLoading: false,
    orderError: null,
    fetchLoading: false,
    fetchError: null,
    updateLoading: false,
    updateError: null,
    deleteLoading: false,
    deleteError: null,
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return { ...state, orderLoading: true };
        case CREATE_ORDER_SUCCESS:
            return { ...state, orderLoading: false, order: action.payload };
        case CREATE_ORDER_FAILURE:
            return { ...state, orderLoading: false, orderError: action.payload };

        case FETCH_ORDERS_REQUEST:
            return { ...state, fetchLoading: true };
        case FETCH_ORDERS_SUCCESS:
            return { ...state, fetchLoading: false, orders: action.payload };
        case FETCH_ORDERS_FAILURE:
            return { ...state, fetchLoading: false, fetchError: action.payload };

        case FETCH_USER_ORDERS_REQUEST:
            return { ...state, fetchLoading: true };
        case FETCH_USER_ORDERS_SUCCESS:
            return { ...state, fetchLoading: false, userOrders: action.payload };
        case FETCH_USER_ORDERS_FAILURE:
            return { ...state, fetchLoading: false, fetchError: action.payload };

        case UPDATE_ORDER_REQUEST:
            return { ...state, updateLoading: true };
        case UPDATE_ORDER_SUCCESS:
            return { ...state, updateLoading: false, order: action.payload };
        case UPDATE_ORDER_FAILURE:
            return { ...state, updateLoading: false, updateError: action.payload };

        case DELETE_ORDER_REQUEST:
            return { ...state, deleteLoading: true };
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                deleteLoading: false,
                orders: state.orders.filter(order => order._id !== action.payload),
                userOrders: state.userOrders.filter(order => order._id !== action.payload)
            };
        case DELETE_ORDER_FAILURE:
            return { ...state, deleteLoading: false, deleteError: action.payload };

        default:
            return state;
    }
};

export default ordersReducer;
