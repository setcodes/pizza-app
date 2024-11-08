import { useLoaderData } from 'react-router-dom';
import { IProduct } from '../../interfaces/Product.interface';

export function Product() {
	const data = useLoaderData() as IProduct;
	return (
		<>
			<p>{`Product - ${data.name}`}</p>
		</>
	);
}
