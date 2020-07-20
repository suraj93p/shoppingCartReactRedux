import { constants } from '../constants';
import {
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE
} from '../action-types';

export const productsList = (state = constants.defaultState.productsList, action: { type?: string, payload?: any } = {}) => {
    switch (action.type) {
        case GET_PRODUCTS_BEGIN:
            return action.payload;
        case GET_PRODUCTS_SUCCESS:
            return action.payload;
        case GET_PRODUCTS_FAILURE:
            return action.payload;
        default:
            return state;
    }
};
