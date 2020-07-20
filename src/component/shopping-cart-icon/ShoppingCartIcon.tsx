import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Product as ProductModel } from '../../model/product';
import CartIcon from '../../assets/shopping-cart.svg';
import './ShoppingCartIcon.css';

interface ShoppingCartIconProps {
    onClick: () => void;
}

const ShoppingCartIcon: FC<ShoppingCartIconProps> = (({ onClick }) => {
    const productsList = useSelector((state: any) => state.productsList);
    let totalItems = 0;
    
    if (productsList.data && Array.isArray(productsList.data) && productsList.data.length) {
        totalItems = productsList.data.reduce((totalCount: number, product: ProductModel) => {
            return totalCount + (product.quantity || 0);
        }, 0);
    }

    return (
        <div className='icon-container' onClick={(onClick)}>
            <img className='shopping-cart-icon' src={CartIcon} alt='shopping-cart-icon' />
            <span className='number-of-items-in-cart'>{totalItems}</span>
        </div>
    );
});

export default ShoppingCartIcon;
