import {FETCH_CATEGORIES_SUCCESS} from "../actions/categoriesActions";
const initialState = {
    categories: [],
};
const categoriesReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_CATEGORIES_SUCCESS:
            return { ...state, categories: actions.payload };
        default:
            return state;
    }
};
export default categoriesReducer;