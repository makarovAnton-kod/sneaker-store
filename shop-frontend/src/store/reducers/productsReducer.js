import {
    CREATE_PRODUCT_FAILURE,
    CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS, FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS
} from '../actions/productsActions';

const initialState = {
    products: [],
    product: null,
    fetchLoading: false,
    singleLoading: false,
    fetchError: null,
    createProductsError: null,
    createProductsLoading: false,
    deleteProductLoading: false,
    updateProductLoading: false,
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
            return {...state, fetchLoading: true};
        case FETCH_PRODUCTS_SUCCESS:
            return {...state, fetchLoading: false, products: actions.payload};
        case FETCH_PRODUCTS_FAILURE:
            return {...state, fetchLoading: false, fetchError: actions.payload};
        case CREATE_PRODUCT_REQUEST:
            return {...state, createProductsLoading: true};
        case CREATE_PRODUCT_SUCCESS:
            return {...state, createProductsLoading: false};
        case CREATE_PRODUCT_FAILURE:
            return {...state, createProductsError: actions.payload, createProductsLoading: false};
        case DELETE_PRODUCT_REQUEST:
            return {...state, deleteProductLoading: true};
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                deleteProductLoading: false,
                products: state.products.filter(product => product._id !== actions.payload)
            };
        case DELETE_PRODUCT_FAILURE:
            return {...state, deleteProductLoading: false, fetchError: actions.payload};
        case UPDATE_PRODUCT_REQUEST:
            return {...state, updateProductLoading: true};
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                updateProductLoading: false,
                products: state.products.map(product =>
                    product._id === actions.payload._id ? actions.payload : product
                ),
                product: actions.payload
            };
        case UPDATE_PRODUCT_FAILURE:
            return {...state, updateProductLoading: false, fetchError: actions.payload};
        default:
            return state;
    }
};

export default productsReducer;
