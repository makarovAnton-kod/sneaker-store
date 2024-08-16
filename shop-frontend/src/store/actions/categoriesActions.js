import axiosApi from "../../axiosApi";

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILURE = 'CREATE_CATEGORY_FAILURE';
export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';
export const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';

const fetchCategoriesRequest = () => ({type: FETCH_CATEGORIES_REQUEST});
const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, payload: categories});
const createCategoryRequest = () => ({type: CREATE_CATEGORY_REQUEST});
const createCategorySuccess = () => ({type: CREATE_CATEGORY_SUCCESS});
const createCategoryFailure = error => ({type: CREATE_CATEGORY_FAILURE, payload: error});
const deleteCategoryRequest = () => ({type: DELETE_CATEGORY_REQUEST});
const deleteCategorySuccess = categoryId => ({type: DELETE_CATEGORY_SUCCESS, payload: categoryId});
const deleteCategoryFailure = error => ({type: DELETE_CATEGORY_FAILURE, payload: error});
const updateCategoryRequest = () => ({type: UPDATE_CATEGORY_REQUEST});
const updateCategorySuccess = category => ({type: UPDATE_CATEGORY_SUCCESS, payload: category});
const updateCategoryFailure = error => ({type: UPDATE_CATEGORY_FAILURE, payload: error});

export const fetchCategories = () => {
    return async dispatch => {
        try {
            dispatch(fetchCategoriesRequest());
            const response = await axiosApi('/categories');
            dispatch(fetchCategoriesSuccess(response.data));
        } catch (e) {
            console.error(e);
        }
    };
};

export const createCategory = (categoryData) => {
    return async dispatch => {
        try {
            dispatch(createCategoryRequest());
            await axiosApi.post('/categories', categoryData);
            dispatch(createCategorySuccess());
            dispatch(fetchCategories());
        } catch (e) {
            dispatch(createCategoryFailure(e.message));
            throw e;
        }
    };
};

export const deleteCategory = (categoryId) => {
    return async dispatch => {
        try {
            dispatch(deleteCategoryRequest());
            await axiosApi.delete(`/categories/${categoryId}`);
            dispatch(deleteCategorySuccess(categoryId));
            dispatch(fetchCategories());
        } catch (e) {
            dispatch(deleteCategoryFailure(e.message));
            throw e;
        }
    };
};

export const updateCategory = (categoryId, categoryData) => {
    return async dispatch => {
        try {
            dispatch(updateCategoryRequest());
            const response = await axiosApi.put(`/categories/${categoryId}`, categoryData);
            dispatch(updateCategorySuccess(response.data));
            dispatch(fetchCategories());
        } catch (e) {
            dispatch(updateCategoryFailure(e.message));
            throw e;
        }
    };
};
