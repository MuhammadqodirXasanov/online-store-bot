import React from 'react';
import Button from '../button/button';
import './card.css';

const Card = (props) => {
	const [count, setCount] = React.useState(0);
	const { product, onAddItem, onRemoveItem } = props;

	const handleIncrement = () => {
		setCount((prev) => prev + 1);
		onAddItem(product);
	};

	const handleDecrement = () => {
		setCount((prev) => prev - 1);
		onRemoveItem(product);
	};

	return (
		<li className='card'>
			<span className={`${count !== 0 ? 'card__badge' : 'card__badge-hidden'}`}>
				{count}
			</span>
			<div className='image__container'>
				<img src={product.Image} alt={product.title} />
			</div>
			<div className='card__body'>
				<h2 className='card__title'>{product.title}</h2>
				<div className='card__price'>
					{product.price.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
				</div>
			</div>

			<div className='hr'></div>

			<div className='btn__container'>
				<Button title='+' onClick={handleIncrement} type='add' />
				{count !== 0 && (
					<Button title='-' type='remove' onClick={handleDecrement} />
				)}
			</div>
		</li>
	);
};

export default Card;
