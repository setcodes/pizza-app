import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import { ILogin } from '../../interfaces/Login.interface';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { ILoginResponse } from '../../interfaces/LoginResponse';

export function Login() {
	const [errorLogin, setErrorLogin] = useState<string | null>();
	const navigate = useNavigate();

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		setErrorLogin(null);
		const target = e.target as typeof e.target & ILogin;
		const { email, password } = target;
		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		try {
			const data = await axios.post<ILoginResponse>(`${PREFIX}/auth/login`, {
				email,
				password,
			});
			localStorage.setItem('jwt', data.data.access_token);
			navigate('/');
		} catch (e) {
			if (e instanceof AxiosError) {
				setErrorLogin(e.response?.data.message);
			}
		}
	};

	return (
		<div className={styles['login']}>
			<Heading>Вход</Heading>
			{errorLogin && <div className={styles['error']}>{errorLogin}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor="email">Ваш email</label>
					<Input id="email" name="email" placeholder="Email" />
				</div>
				<div className={styles['field']}>
					<label htmlFor="password">Ваш пароль</label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Пароль"
					/>
				</div>
				<Button appearence="big">Вход</Button>
			</form>
			<div className={styles['links']}>
				<div>Нет акканута?</div>
				<Link to="/auth/register">Зарегистрироваться</Link>
			</div>
		</div>
	);
}
