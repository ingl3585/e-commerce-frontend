import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import './bootstrap.min.css';
import { Container } from 'react-bootstrap';

const App = () => {
	return (
		<div className='App'>
			<Header />
			<main className='py-3'>
				<Container>
					<p>App</p>
				</Container>
			</main>
			<Footer />
		</div>
	);
};

export default App;
