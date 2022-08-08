
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import styles from './Header.module.scss';
import Link from 'next/link';
import { categories } from 'constants/categories';
import { authApi } from 'libs/auth.api';
import { useUser } from 'hooks/useUser';
import { BsDoorOpenFill } from "react-icons/bs";

export const Header = () => {
  const { mutate: mutateUser, user } = useUser();
  const logoutHandler = async () => {
    await authApi.logout();
    mutateUser();
  }
  return (
    <Navbar bg="white" expand="lg" className={styles.navbar}>
      <Container >
        <Navbar.Brand >
          <Link href="/">
            <a className={styles.logo}>{`{ Code Knowledge Test }`}</a>
          </Link></Navbar.Brand>
        <Navbar.Toggle className={styles.burgerMenu} />
        <Navbar.Collapse className="justify-content-end">
          <Nav >

            <NavDropdown title="Questions" className={styles.navbarLinks} >
              {categories.map((category) => {
                return (
                  <NavDropdown.Item key={category.name} className={styles.navbarDropdownItem}>
                    <Link href={`/questions/${category.name.toLowerCase()}`}>
                      <a>{category.name}</a>
                    </Link>
                  </NavDropdown.Item>
                );
              })}

            </NavDropdown>

            <NavDropdown title="Test" className={styles.navbarLinks}>
              {categories.map((category) => {
                return (
                  <NavDropdown.Item key={category.name} className={styles.navbarDropdownItem}>
                    <Link href={`/test/${category.name.toLowerCase()}`}>
                      <a>{category.name}</a>
                    </Link>
                  </NavDropdown.Item>
                );
              })}

            </NavDropdown>
            <Nav.Link href="#" className={styles.navbarLinks}>Link</Nav.Link>
            <div className={styles.logout}>
              {/* {user?.email || 'name'} */}
              <BsDoorOpenFill className='ml-3' onClick={logoutHandler} />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}
