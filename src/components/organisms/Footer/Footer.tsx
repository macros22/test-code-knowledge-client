import cn from 'clsx';
import { format } from 'date-fns';
import { FooterProps } from './Footer.props';
import styles from './Footer.module.scss';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<div>Code knowledge test © 2021 - {format(new Date(), 'yyyy')}</div>
			<a href="https://github.com/kramax42/test-code-knowledge-client" target="_blank">
				Github
			</a>
		</footer>
	);
};
