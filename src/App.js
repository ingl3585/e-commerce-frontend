import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';
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
						<Route path='/login' element={<LoginPage />} />
						<Route path='/register' element={<RegisterPage />} />
						<Route path='/profile' element={<ProfilePage />} />
						<Route path='/shipping' element={<ShippingPage />} />
						<Route path='/payment' element={<PaymentPage />} />
						<Route path='/placeorder' element={<PlaceOrderPage />} />
						<Route path='/order/:id' element={<OrderPage />} />
						<Route path='/product/:id' element={<ProductPage />} />
						<Route path='/cart/:id?' element={<CartPage />} />
						<Route path='/admin/userlist' element={<UserListPage />} />
						<Route path='/admin/user/:id/edit' element={<UserEditPage />} />
						<Route path='/admin/productlist' element={<ProductListPage />} />
						<Route path='/admin/orderlist' element={<OrderListPage />} />
						<Route
							path='/admin/product/:id/edit'
							element={<ProductEditPage />}
						/>
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
