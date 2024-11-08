import { useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { Product } from '../../interfaces/Product.interface';
import { PREFIX } from '../../helpers/API';
import axios from 'axios';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);

	const getMenu = async () => {
		try {
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
		} catch (e) {
			console.error(e);
			return;
		}
	};
	useEffect(() => {
		getMenu();
	}, []);

	return (
		<>
			<div className={styles['head']}>
				<Heading>Меню</Heading>
				<Search placeholder="Введите блюдо или состав" />
			</div>
			<div>
				{products.map((p) => {
					return (
						<ProductCard
							key={p.id}
							id={p.id}
							name={p.name}
							description={p.ingredients.join(', ')}
							rating={p.rating}
							price={p.price}
							image={p.image}
						/>
					);
				})}
			</div>
		</>
	);
}
