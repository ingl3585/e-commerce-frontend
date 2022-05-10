import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Button,
	Card,
	Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';

const ProductPage = ({ history }) => {
	const [qty, setQty] = useState(1);
	const { id } = useParams();
	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;
	useEffect(() => {
		dispatch(listProductDetails(Number(id)));
	}, [dispatch, id]);
	const addToCartHandler = () => {
		history.push(`/cart/${Number(id)}?qty=${qty}`);
	};
	return (
		<div>
			<Link to='/' className='btn btn-light my-3'>
				Homepage
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product?.image} alt={product?.title} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product?.title}</h3>
							</ListGroup.Item>
						</ListGroup>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Rating
									value={product?.rating?.rate}
									text={`${product?.rating?.count} reviews`}
									color={'#F8E825'}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: {product?.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price: </Col>
										<Col>
											<strong>${product?.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status: </Col>
										<Col>
											{product?.rating?.stock > 0 ? 'In Stock' : 'Out of Stock'}
										</Col>
									</Row>
								</ListGroup.Item>
								{product?.rating?.stock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col xs='auto' className='my-1'>
												<Form.Control
													as='select'
													value={qty}
													onChange={(e) => setQty(e.target.value)}>
													{[...Array(product?.rating?.stock.keys())].map(
														(x) => {
															return (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															);
														}
													)}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Button
										onClick={addToCartHandler}
										className='btn-block'
										disabled={product?.rating?.stock === 0}
										type='button'>
										Add to Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</div>
	);
};

export default ProductPage;
