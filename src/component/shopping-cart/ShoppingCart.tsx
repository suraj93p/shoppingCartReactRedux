import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product as ProductModel } from '../../model/product';
import { setfetchProductsSuccess } from '../../actions';
import './ShoppingCart.css';
import { deepClone } from '../../utils/deep-clone';

const ShoppingCart: FC = (() => {
    const dispatch = useDispatch();
    const productsList = useSelector((state: any) => state.productsList);
    const [shoppingCartItems, updateShoppingCartItems] = useState([]);
    const [totalAmount, updateTotalAmount] = useState(0);

    useEffect(() => {
        if (productsList.data) {
            const shoppingItems = productsList.data.filter((product: ProductModel) => product.quantity);
            const totalAmount = shoppingItems.reduce((total: number, product: ProductModel) => {
                return total + (product.quantity || 0) * product.price;
            }, 0);
            updateShoppingCartItems(shoppingItems);
            updateTotalAmount(totalAmount);
        }
    }, [productsList]);

    const updateCart = (actionProduct: ProductModel, action: String) => {
        const productsListCopy = deepClone(productsList);
        const selectedProduct = productsListCopy.data.find((product: ProductModel) => product.id === actionProduct.id)
        if (action === 'removeAll') {
            selectedProduct.quantity = 0;
        }
        dispatch(setfetchProductsSuccess(productsListCopy));
    };

    const renderCartItem = (product: ProductModel) => {
        return (
            <div className='product-row'>
                <div className='product-image'>
                    <img src={product.imgUrl} alt={product.name} />
                </div>
                <div className='product-name'>
                    <div className='title'>Product Name</div>
                    <div className='value'>{product.name}</div>
                </div>
                <div className='product-desc'>
                    <div className='title'>Short Description</div>
                    <div className='value' title={product.description}>{product.description}</div>
                </div>
                <div className='product-quantity'>
                    <div className='title'>Qty</div>
                    <div className='value'>{product.quantity}</div>
                </div>
                <div className='product-price'>
                    <div className='title'>Price per 1pc</div>
                    <div className='value'>{product.price}$</div>
                </div>
                <div className='product-total-price'>
                    <div className='title'>Line total</div>
                    <div className='value'>{((product.quantity || 1) * product.price).toFixed(2)}$</div>
                </div>
                <div className='product-action'>
                    <div className='title'></div>
                    <div className='value'>
                        <button className='remove-item' onClick={() => updateCart(product, 'removeAll')}>Remove Item</button>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <>
            {shoppingCartItems.map((product: ProductModel) => {
                return renderCartItem(product);
            })}
            {shoppingCartItems.length > 0 &&
                <div className='total-amount-wrapper'>
                    <div className='total-amount-section'>
                        <div className='title'>Total amount for payment:</div>
                        <div className='value'>{totalAmount.toFixed(2)}$</div>
                    </div>
                </div>}
        </>
    );
});

export default ShoppingCart;
