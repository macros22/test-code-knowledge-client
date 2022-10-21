import Link from 'next/link';
import { Navbar } from 'react-bootstrap';
import styles from './Header.module.scss';

export const Logo = (): JSX.Element => {
    return (
        <Navbar.Brand >
            <Link href="/">
                <a className={styles.logo}>
                    <span className={styles.bracket}>{`{`}</span>
                    {` Codeteko `}
                    <span className={styles.bracket}>{`}`}</span>
                </a>
            </Link>
        </Navbar.Brand>
    );
}