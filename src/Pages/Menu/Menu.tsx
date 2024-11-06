import { Link } from 'react-router-dom';

export function Menu() {
	return (
		<>
			<h1>Menu</h1>
			<Link to="/">Menu/</Link>
			<Link to="/cart">Cart</Link>
		</>
	);
}
