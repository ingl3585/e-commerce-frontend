import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<a href={`/product/${product.id}`}>
				<Card.Img className='card-img' src={product.image} />
			</a>
			<Card.Body>
				<a href={`/product/${product.id}`}>
					<Card.Title as='div'>
						<strong>{product.title}</strong>
					</Card.Title>
				</a>
				<Card.Text as='div'>
					<div className='my-3'>
						<Rating
							value={product.rating.rate}
							text={`${product.rating.count} Reviews`}
							color={'#F8E825'}
						/>
					</div>
				</Card.Text>
				<Card.Text as='h3'>${product.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
