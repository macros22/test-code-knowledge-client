import { TextareaProps } from './Textarea.props';
import styles from './Textarea.module.scss';
import cn from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

export const Textarea = forwardRef(({ errorMessage, name, className, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
	return (
		<div className={cn(styles.textareaWrapper, className)}>
			{/* <span className={styles.label}>{name}</span> */}
			<textarea className={cn(styles.textarea, {
				[styles.error]: errorMessage
			})} ref={ref} {...props} />
			{errorMessage && <span role="alert" className={styles.errorMessage}>{errorMessage}</span>}
		</div>
	);
});