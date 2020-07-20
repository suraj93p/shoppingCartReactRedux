import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Product as ProductModel } from '../../model/product';
import { getProductsThunk } from '../../actions/thunks/get-products';
import Product from '../product/Product';
import './Products.css';

const Products = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState<ProductModel[]>([]);
    const productsList = useSelector((state: any) => state.productsList);

    useEffect(() => {
        if (!productsList.data) {
            // get product not called yet
            // call api
            dispatch(getProductsThunk());
        }
    }, []);

    useEffect(() => {
        if (Array.isArray(productsList.data)) {
            setProducts(productsList.data)
        }
    }, [productsList])

    return (
        products.length === 0
            ? <div className="loader-container">
                <Loader type="Grid" color="#FF4500" height={100} width={100} timeout={3000} />
            </div>
            : <div className='products-container'>
                {products.map(product => <Product key={product.id} product={product} />)}
            </div>
    );
};

export default Products;
