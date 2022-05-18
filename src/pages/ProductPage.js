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
import {
	listProductDetails,
	createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductPage = ({ history }) => {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const { id } = useParams();
	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const {
		loading: loadingProductReview,
		error: errorProductReview,
		success: successProductReview,
	} = productReviewCreate;
	useEffect(() => {
		if (successProductReview) {
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetails(Number(id)));
	}, [dispatch, id, successProductReview]);
	const addToCartHandler = () => {
		history.push(`/cart/${Number(id)}?qty=${qty}`);
	};
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createProductReview(id, {
				rating,
				comment,
			})
		);
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
				<div>
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
												{product?.rating?.stock > 0
													? 'In Stock'
													: 'Out of Stock'}
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
					<Row>
						<Col md={6}>
							<h4>Reviews</h4>
							{product.reviews.length === 0 && (
								<Message variant='info'>No Reviews</Message>
							)}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => {
									return (
										<ListGroup.Item key={review.id}>
											<strong>{review.name}</strong>
											<Rating value={review.rating} color='#F8E825' />
											<p>{review.createdAt.substring(0, 10)}</p>
											<p>{review.comment}</p>
										</ListGroup.Item>
									);
								})}
								<ListGroup.Item>
									<h4>Write a Review</h4>
									{loadingProductReview && <Loader />}
									{successProductReview && (
										<Message variant='success'>Review submitted.</Message>
									)}
									{errorProductReview && (
										<Message variant='danger'>{errorProductReview}</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={(e) => setRating(e.target.value)}>
													<option value=''>Select...</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Fair</option>
													<option value='3'>3 - Good</option>
													<option value='4'>4 - Very Good</option>
													<option value='5'>5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Label>Review</Form.Label>
												<Form.Control
													as='text-area'
													row='5'
													value={comment}
													onChange={(e) =>
														setComment(e.target.value)
													}></Form.Control>
											</Form.Group>
											<Button
												disabled={loadingProductReview}
												type='submit'
												variant='primary'>
												Submit
											</Button>
										</Form>
									) : (
										<Message variant='info'>
											Please <Link to='/login'>Login</Link> to write a review.
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</div>
			)}
		</div>
	);
};

export default ProductPage;
