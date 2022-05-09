import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import products from '../products';

const Homepage = () => {
	return (
		<div>
			<h1>Products</h1>
			<Row>
				{products.map((product) => {
					return (
						<Col key={product.id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					);
				})}
			</Row>
		</div>
	);
};

export default Homepage;
