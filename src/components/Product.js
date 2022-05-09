import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/product/${product.id}`}>
				<Card.Img className='card-img' src={product.image} />
			</Link>
			<Card.Body>
				<Link to={`/product/${product.id}`}>
					<Card.Title as='div'>
						<strong>{product.title}</strong>
					</Card.Title>
				</Link>
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
