import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { IconName } from '../button-icon/ButtonIcon.props';

export interface ButtonProps extends
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	children: ReactNode;
	appearance: 'primary' | 'ghost' | 'disabled';
	icon?: IconName;
}