import cn from 'clsx';
import { format } from 'date-fns';
import { FooterProps } from './Footer.props';
import styles from './Footer.module.scss';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<div>Code knowledge test © 2021 - {format(new Date(), 'yyyy')}</div>
			<div>All rights reserved</div>
			<a href="#" target="_blank">
				Github
			</a>
		</footer>
	);
};
