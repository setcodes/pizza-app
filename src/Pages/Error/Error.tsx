import { Link } from 'react-router-dom';

export function Error() {
	return (
		<>
			<p>Error</p>
			<div>
				<Link to="/">Menu/</Link>
				<Link to="/cart">Cart</Link>
			</div>
		</>
	);
}
