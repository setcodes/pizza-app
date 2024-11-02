import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

function Button({ children, className, ...props }: ButtonProps) {
	return (
		<button className={cn('accent, button', className)} {...props}>
			{children}
		</button>
	);
}

export default Button;
