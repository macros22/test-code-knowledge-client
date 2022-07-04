import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';


import up from 'assets/icons/close.svg';
import close from 'assets/icons/close.svg';
import menu from 'assets/icons/menu.svg';
import deleteIcon from 'assets/icons/delete.svg';
import edit from 'assets/icons/edit.svg';
import plus from 'assets/icons/plus.svg';

export const icons = {
	up,
	close,
	menu,
	edit,
	deleteIcon,
	plus
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	icon: IconName;
	appearance: 'primary' | 'white';
}