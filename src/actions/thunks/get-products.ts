import axios from 'axios';
import {
    setfetchProductsBegin,
    setfetchProductsSuccess,
    setfetchProductsFailed,
} from '../../actions';
import { Product as ProductModel } from '../../model/product';
import { constants } from '../../constants';

const payloadTransformer = (res: any) => {
    res.data.forEach((product: ProductModel) => {
        product.quantity = 0;
    });
    return res;
}

export const getProductsThunk = () => {
    return (dispatch: (arg0: { type: any; }) => void) => {
        dispatch(setfetchProductsBegin([]));
        axios.get(constants.url.getProducts).then(
            res => dispatch(setfetchProductsSuccess(payloadTransformer(res))),
            () => dispatch(setfetchProductsFailed('fail'))
        );
    }
};
