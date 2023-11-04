import './cart.css';
import Button from '../button/button';
import totalPrice from '../../units/total-price';
import React from 'react';

const Cart = ({ cartItems, onCheckout }) => {
	return (
		<div className='cart__container'>
			<h3>
				Total price:{' '}
				{totalPrice(cartItems).toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
				})}
			</h3>

			<Button
				title={cartItems.length ? 'Payment' : 'Give Order'}
				type='checkout'
				onClick={() => onCheckout(cartItems.length)}
			/>
		</div>
	);
};

export default Cart;
