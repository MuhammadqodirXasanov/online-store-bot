import React from 'react';
import './App.css';
import Cart from './components/cart/cart';
import Card from './components/card/card';
import getData from './constants/db';

const products = getData();

const telegram = window.Telegram.WebApp;

function App() {
	// selected items
	const [cartItems, setCartItems] = React.useState([]);

	React.useEffect(() => {
		telegram.ready();
	});

	// add item
	const onAddItem = (item) => {
		const existItem = cartItems.find((a) => a.id == item.id);

		if (existItem) {
			const newData = cartItems.map((c) =>
				c.id == item.id ? { ...existItem, quantity: existItem.quantity + 1 } : c
			);

			setCartItems(newData);
		} else {
			const newData = [...cartItems, { ...item, quantity: 1 }];

			setCartItems(newData);
		}
	};

	// remove item
	const onRemoveItem = (item) => {
		const existItem = cartItems.find((c) => c.id == item.id);

		if (existItem.quantity === 1) {
			const newData = cartItems.filter((c) => c.id !== existItem.id);

			setCartItems(newData);
		} else {
			const newData = cartItems.map((c) =>
				c.id === existItem.id
					? { ...existItem, quantity: existItem.quantity - 1 }
					: c
			);

			setCartItems(newData);
		}
	};

	const onCheckout = (existItem) => {
		telegram.MainButton.text = 'Buy :)';
		existItem ? telegram.MainButton.show() : telegram.MainButton.hide();
	};

	const onSendData = React.useCallback(() => {
		telegram.sendData(JSON.stringify(cartItems));
	}, [cartItems]);

	React.useEffect(() => {
		telegram.onEvent('mainButtonClicked', onSendData);

		return () => telegram.offEvent('mainButtonClicked', onSendData);
	}, [onSendData]);

	return (
		<>
			<h1 className='heading'>M. Xasanov's Products</h1>
			<Cart cartItems={cartItems} onCheckout={onCheckout} />
			<ul className='cards__container'>
				{products.map((product) => (
					<Card
						key={product.id}
						product={product}
						onRemoveItem={onRemoveItem}
						onAddItem={onAddItem}
					/>
				))}
			</ul>
		</>
	);
}

export default App;
