
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import styles from './Header.module.scss';
import Link from 'next/link';
import { categories } from 'constants/categories';

export const Header = () => {
  return (
    <Navbar bg="white" expand="lg" className={styles.navbar}>
      <Container fluid>
        <Navbar.Brand >
          <Link href="/">
            <a className={styles.logo}>Code Knowledge Test</a>
          </Link></Navbar.Brand>
        <Navbar.Toggle className={styles.burgerMenu}  />
        <Navbar.Collapse className="justify-content-end">
          <Nav >

            <NavDropdown title="Question" id="basic-nav-dropdown" >
              {categories.map((category) => {
                return (
                  <NavDropdown.Item key={category.name}>
                    <Link href={`/questions/${category.name.toLowerCase()}`}>
                      <a>{category.name}</a>
                    </Link>
                  </NavDropdown.Item>
                );
              })}

            </NavDropdown>

            <NavDropdown title="Test" id="basic-nav-dropdown" >
              {categories.map((category) => {
                return (
                  <NavDropdown.Item key={category.name}>
                    <Link href={`/test/${category.name.toLowerCase()}`}>
                      <a>{category.name}</a>
                    </Link>
                  </NavDropdown.Item>
                );
              })}
              
            </NavDropdown>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}
