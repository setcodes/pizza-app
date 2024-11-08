import { useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { IProduct } from '../../interfaces/Product.interface';
import { PREFIX } from '../../helpers/API';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

export function Menu() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const getMenu = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			console.error(e);
			setIsLoading(false);
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
				{error && <>{`${error}`}</>}
				{!isLoading && <MenuList products={products} />}
				{isLoading && <>Загружем данные...</>}
			</div>
		</>
	);
}

export default Menu;
