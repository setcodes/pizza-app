import { Link } from 'react-router-dom';

export function Cart() {
	return (
		<>
			<p>Cart</p>

			<Link to="/">Menu/</Link>
			<Link to="/cart">Cart</Link>
		</>
	);
}
