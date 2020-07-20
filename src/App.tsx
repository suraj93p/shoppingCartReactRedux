import React, { useState } from 'react';
import Header from './component/header/Header';
import Products from './component/products/Products';
import ShoppingCartIcon from './component/shopping-cart-icon/ShoppingCartIcon';
import ShoppingCart from './component/shopping-cart/ShoppingCart';
import './App.css';

const App = () => {
    const [isShoppingCartShown, showShoppingCart] = useState<boolean>(false);

    return (
        <div>
            <Header />
            <ShoppingCartIcon onClick={() => {
                showShoppingCart(!isShoppingCartShown);
            }} />
            {isShoppingCartShown
                ? <ShoppingCart />
                : <Products />
            }
        </div>
    );
};

export default App;
