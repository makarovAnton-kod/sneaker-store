import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE
} from "../actions/ordersActions";

const initialState = {
    orders: [],
    orderLoading: false,
    orderError: null,
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
            return { ...state, fetchLoading: false, error: action.payload };
        default:
            return state;
    }
};

export default ordersReducer;
