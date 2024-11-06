import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { Menu } from './Pages/Menu/Menu';
import { Cart } from './Pages/Cart/Cart';
import { Error } from './Pages/Error/Error';

function App() {
	return (
		<>
			<Button appearence="small">нажать</Button>
			<Button appearence="big">нажать</Button>
			<Input placeholder="email" />
		</>
	);
}

export default App;
