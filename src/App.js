import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import './bootstrap.min.css';
import { Container } from 'react-bootstrap';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Routes>
						<Route exact path='/' element={<Homepage />} />
						<Route path='/product/:id' element={<ProductPage />} />
						<Route path='/cart/:id?' element={<CartPage />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
