import React from 'react';
import Link from 'next/link';
import cn from 'clsx';
import { HeaderProps } from './Header.props';
import styles from './Header.module.scss';
import { Select, Option } from 'components';
import { technologyList } from 'constants/technologies';

export const Header = ({}: HeaderProps): JSX.Element => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen((prev) => !prev);
	};

	return (
		<>
			<header className={styles.header}>
				<div className={styles.container}>
					<div className={styles.headerBody}>
						<Link href="/">
							<a className={styles.logo}>Code Knowledge Test</a>
						</Link>

						<div
							onClick={toggleMobileMenu}
							className={cn(styles.headerBurger, {
								[styles.active]: isMobileMenuOpen,
							})}
						>
							<span></span>
						</div>

						<nav
							className={cn(styles.headerMenu, {
								[styles.headerMenuActive]: isMobileMenuOpen,
							})}
						>
							<ul>
								<li>
									<Select placeholder={'Questions'}>
										{technologyList.map((technology) => {
											return (
												<Option
													path={`/questions`}
													key={technology.name}
													value={technology.name.toLowerCase()}
												>
													{technology.name}
												</Option>
											);
										})}
									</Select>
								</li>
								<li>
									<Select placeholder={'Test'}>
										{technologyList.map((technology) => {
											return (
												<Option
													path={`/test`}
													key={technology.name}
													value={technology.name.toLowerCase()}
												>
													{technology.name}
												</Option>
											);
										})}
									</Select>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</header>
		</>
	);
};
