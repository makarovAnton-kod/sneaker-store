import axiosApi from "../../axiosApi";

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';
export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';
export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

// Действия
const fetchProductRequest = () => ({type: FETCH_PRODUCT_REQUEST});
const fetchProductSuccess = product => ({type: FETCH_PRODUCT_SUCCESS, payload: product});
const fetchProductFailure = error => ({type: FETCH_PRODUCT_FAILURE, payload: error});

const fetchProductsRequest = () => ({type: FETCH_PRODUCTS_REQUEST});
const fetchProductsSuccess = products => ({type: FETCH_PRODUCTS_SUCCESS, payload: products});
const fetchProductsFailure = error => ({type: FETCH_PRODUCTS_FAILURE, payload: error});

const createProductRequest = () => ({type: CREATE_PRODUCT_REQUEST});
const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});
const createProductFailure = error => ({type: CREATE_PRODUCT_FAILURE, payload: error});

const deleteProductRequest = () => ({type: DELETE_PRODUCT_REQUEST});
const deleteProductSuccess = productId => ({type: DELETE_PRODUCT_SUCCESS, payload: productId});
const deleteProductFailure = error => ({type: DELETE_PRODUCT_FAILURE, payload: error});

const updateProductRequest = () => ({type: UPDATE_PRODUCT_REQUEST});
const updateProductSuccess = product => ({type: UPDATE_PRODUCT_SUCCESS, payload: product});
const updateProductFailure = error => ({type: UPDATE_PRODUCT_FAILURE, payload: error});

// Получение продукта по ID
export const fetchProduct = id => {
    return async dispatch => {
        try {
            dispatch(fetchProductRequest());
            const response = await axiosApi(`/products/${id}`);
            dispatch(fetchProductSuccess(response.data));
        } catch (e) {
            dispatch(fetchProductFailure(e.message));
        }
    };
};

// Получение списка продуктов
export const fetchProducts = () => {
    return async (dispatch, getState) => {
        try {
            const headers = {
                'Authorization': getState().users.user && getState().users.user.token,
            };
            dispatch(fetchProductsRequest());
            const response = await axiosApi('/products', {headers});
            dispatch(fetchProductsSuccess(response.data));
        } catch (e) {
            dispatch(fetchProductsFailure(e.message));
        }
    };
};

// Создание нового продукта
export const createProduct = (productData) => {
    return async dispatch => {
        try {
            dispatch(createProductRequest());
            const formData = new FormData();

            for (const key in productData) {
                if (productData.hasOwnProperty(key)) {
                    formData.append(key, productData[key]);
                }
            }

            await axiosApi.post('/products', formData);
            dispatch(createProductSuccess());
        } catch (e) {
            dispatch(createProductFailure(e.message));
            throw e;
        }
    };
};

// Удаление продукта
export const deleteProduct = (productId) => {
    return async (dispatch, getState) => {
        try {
            const headers = {
                'Authorization': getState().users.user && getState().users.user.token,
            };
            dispatch(deleteProductRequest());
            await axiosApi.delete(`/products/${productId}`, {headers});
            dispatch(deleteProductSuccess(productId));
        } catch (e) {
            dispatch(deleteProductFailure(e.message));
            throw e;
        }
    };
};

// Обновление продукта
export const updateProduct = (productId, productData) => {
    return async (dispatch, getState) => {
        try {
            const headers = {
                'Authorization': getState().users.user && getState().users.user.token,
            };
            dispatch(updateProductRequest());
            const formData = new FormData();

            for (const key in productData) {
                if (productData.hasOwnProperty(key)) {
                    formData.append(key, productData[key]);
                }
            }

            const response = await axiosApi.put(`/products/${productId}`, formData, {headers});
            dispatch(updateProductSuccess(response.data));
        } catch (e) {
            dispatch(updateProductFailure(e.message));
            throw e;
        }
    };
};
