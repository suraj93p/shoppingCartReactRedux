import actionCreator from '../utils/action-creator';
import {
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE
} from '../action-types';

export const setfetchProductsBegin = actionCreator(GET_PRODUCTS_BEGIN, 'payload');
export const setfetchProductsSuccess = actionCreator(GET_PRODUCTS_SUCCESS, 'payload');
export const setfetchProductsFailed = actionCreator(GET_PRODUCTS_FAILURE, 'payload');