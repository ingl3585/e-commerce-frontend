import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';

const ProductPage = ({ match }) => {
	const [product, setProduct] = useState([]);
	const { id } = useParams();
	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${Number(id)}`);
			setProduct(data);
		};
		fetchProduct();
	}, []);
	return (
		<div>
			<Link to='/' className='btn btn-light my-3'>
				Homepage
			</Link>
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
						<ListGroup.Item>Description: {product?.description}</ListGroup.Item>
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
							<ListGroup.Item>
								<Button
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
		</div>
	);
};

export default ProductPage;
