import {
    FETCH_CATEGORIES_SUCCESS,
    CREATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_SUCCESS
} from "../actions/categoriesActions";

const initialState = {
    categories: [],
};

const categoriesReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_CATEGORIES_SUCCESS:
            return { ...state, categories: actions.payload };
        case CREATE_CATEGORY_SUCCESS:
        case DELETE_CATEGORY_SUCCESS:
        case UPDATE_CATEGORY_SUCCESS:
            return state; // Эти действия обновляют список, не изменяя состояния напрямую
        default:
            return state;
    }
};

export default categoriesReducer;
