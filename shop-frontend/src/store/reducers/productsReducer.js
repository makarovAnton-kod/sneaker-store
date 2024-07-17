import {
    CREATE_PRODUCT_FAILURE,

    CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS
} from "../actions/prodcutsActions";
const initialState = {
    products: [],
    product: null,
    fetchLoading: false,
    singleLoading: false,
    fetchError: null,
    createProductsError: null,
    createProductsLoading: false,
};
const productsReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_PRODUCT_REQUEST:
            return {...state, singleLoading: true};
        case FETCH_PRODUCT_SUCCESS:
            return {...state, singleLoading: false, product: actions.payload};
        case FETCH_PRODUCT_FAILURE:
            return {...state, singleLoading: false, fetchError: actions.payload};
        case FETCH_PRODUCTS_REQUEST:
            return {...state, createProductsLoading: true};
        case FETCH_PRODUCTS_SUCCESS:
            return {...state, fetchLoading: false, products: actions.payload};
        case FETCH_PRODUCTS_FAILURE:
            return {...state, fetchLoading: false, fetchError: actions.payload};
        case CREATE_PRODUCT_REQUEST:
            return {...state, createProductsLoading: false};
        case CREATE_PRODUCT_FAILURE:
            return {...state, createProductsError: actions.payload, createProductsLoading: false};
        default:
    }
};
export default productsReducer;
