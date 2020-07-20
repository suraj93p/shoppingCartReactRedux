import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setfetchProductsSuccess } from '../../actions';
import { Product as ProductModel } from '../../model/product';
import MinusIcon from '../../assets/minus-icon.svg';
import PlusIcon from '../../assets/plus-icon.svg';
import { deepClone } from '../../utils/deep-clone';
import './Product.css';

interface ProductProps {
    product: ProductModel;
}

const Product: FC<ProductProps> = (({ product }) => {
    const dispatch = useDispatch();
    const productsList = useSelector((state: any) => state.productsList);

    const updateCart = (actionProduct: ProductModel, action: String) => {
        const productsListCopy = deepClone(productsList);
        const selectedProduct = productsListCopy.data.find((product: ProductModel) => product.id === actionProduct.id)
        if (action === 'add') {
            ++selectedProduct.quantity;
        } else if (action === 'remove') {
            --selectedProduct.quantity;
        }
        dispatch(setfetchProductsSuccess(productsListCopy));
    }

    const renderUpdateProductQuantity = (product: ProductModel) => {
        if (product.quantity) {
            return <>
                <div className='action-bar'>
                    <img className='icon' onClick={() => updateCart(product, 'remove')} src={MinusIcon} alt='remove' />
                    <span>{product.quantity}</span>
                    <img className='icon' onClick={() => updateCart(product, 'add')} src={PlusIcon} alt='add' />
                </div>
            </>;
        } else {
            return <>
                <a onClick={() => {
                    updateCart(product, 'add');
                }}>Add to Cart</a>
            </>
        }
    }

    return (
        <div className='product-container'>
            <figure className='product blue'>
                <div>
                    <img src={product.imgUrl} alt='product' />
                    <div className='price'>{product.price}$</div>
                </div>
                <figcaption>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    {renderUpdateProductQuantity(product)}
                </figcaption>
            </figure>
        </div>
    );
});

export default Product;
