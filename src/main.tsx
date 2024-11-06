import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Cart } from './Pages/Cart/Cart.tsx';
import { Menu } from './Pages/Menu/Menu.tsx';
import { Error } from './Pages/Error/Error.tsx';

const router = createBrowserRouter([
	{ path: '/', element: <Menu /> },
	{ path: '/cart', element: <Cart /> },
	{ path: '*', element: <Error /> },
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
		<RouterProvider router={router} />
	</StrictMode>
);
