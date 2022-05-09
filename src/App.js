import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import './bootstrap.min.css';
import { Container } from 'react-bootstrap';

const App = () => {
	return (
		<div className='App'>
			<Header />
			<main className='py-3'>
				<Container>
					<Homepage />
				</Container>
			</main>
			<Footer />
		</div>
	);
};

export default App;
