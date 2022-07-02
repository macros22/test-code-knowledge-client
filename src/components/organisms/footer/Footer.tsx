import { FooterProps } from './Footer.props';
import styles from './Footer.module.scss';
import cn from 'clsx';
import { format } from 'date-fns';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<div>
				Code knowledge test © 2021 - {format(new Date(), 'yyyy')} All rights reserved
			</div>
			<a href="#" target="_blank">Github</a>
		</footer>
	);
};