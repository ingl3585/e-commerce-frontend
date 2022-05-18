import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const ProductCarousel = () => {
	const dispatch = useDispatch();
	const productTopRated = useSelector((state) => state.productTopRated);
	const { loading, error, products } = productTopRated;
	useEffect(() => {
		dispatch(listTopProducts());
	}, [dispatch]);
	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Carousel pause='hover' className='bg-dark'>
			{products.map((product) => {
				return (
					<Carousel.Item key={product.id}>
						<Link to={`/product/${product.id}`}>
							<Image src={product.image} alt={product.title} fluid />
							<Carousel.Caption className='carousel.caption'>
								<h4>
									{product.title} (${product.price})
								</h4>
							</Carousel.Caption>
						</Link>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
};

export default ProductCarousel;
