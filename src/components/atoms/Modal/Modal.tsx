import { ButtonIcon } from 'components';
import React from 'react';
import styles from './Modal.module.scss';
import { ModalProps } from './Modal.props';

export const Modal = ({
	setIsModalOpen,
	children,
}: ModalProps): JSX.Element => {
	return (
		<div>
			<div className={styles.modalOverlay} />
			<div className={styles.modalBoxContainer}>
				<div className={styles.modalBoxControl}>
					<ButtonIcon
						icon="close"
						appearance="white"
						onClick={() => setIsModalOpen(false)}
					></ButtonIcon>
				</div>

				<div className={styles.modalBoxContent}>{children}</div>
			</div>
		</div>
	);
};
