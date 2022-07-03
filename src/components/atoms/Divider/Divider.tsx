import cn from 'clsx';
import { DividerProps } from './Divider.props';
import styles from './Divider.module.scss';

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
	return (
		<hr className={cn(styles.hr, className)} {...props} />
	);
};