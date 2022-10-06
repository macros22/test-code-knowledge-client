import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import styles from './Header.module.scss';
import Link from 'next/link';
import { authApi } from 'libs/auth.api';
import { useUser } from 'hooks/useUser';
import { useRouter } from 'next/router';
import { useQuestionsInfo } from 'hooks';
import { useSnippetsInfo } from 'hooks/snippets/useSnippetssInfo';

export const Header = () => {

  const { mutateUser, isLoggedIn } = useUser();

  const logoutHandler = async () => {
    await authApi.logout();
    mutateUser({ isGuest: true });
  }

  const router = useRouter();
  const signInHandler = async () => {
    router.replace('/auth/sign-n')
  }
  const { questionsInfo } = useQuestionsInfo();
  const { snippetsInfo } = useSnippetsInfo();

  return (
    <Navbar bg="white" expand="lg" className={styles.navbar}>
      <Container >
        <Navbar.Brand >
          <Link href="/">
            <a className={styles.logo}>
              <span className={styles.bracket}>{`{`}</span>
              {` Codeteko `}
              <span className={styles.bracket}>{`}`}</span>
            </a>
          </Link></Navbar.Brand>
        <Navbar.Toggle className={styles.burgerMenu} />
        <Navbar.Collapse className="justify-content-end">
          <Nav>

            {/* <NavDropdown title="Snippets" className={styles.navbarLinks} >
              {Object.keys(snippetsInfo).map((category) => {
                return (
                  <NavDropdown.Item key={category} className={styles.navbarDropdownItem}>
                    <Link href={`/snippets/${category}`}>
                      <a>{category}</a>
                    </Link>
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown> */}

            <NavDropdown title="Questions" className={styles.navbarLinks} >
              {Object.keys(questionsInfo).map((category) => {
                return (
                  <NavDropdown.Item key={category} className={styles.navbarDropdownItem}>
                    <Link href={`/questions/${category}`}>
                      <a>{category}</a>
                    </Link>
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>

            <NavDropdown title="Test" className={styles.navbarLinks}>
              {Object.keys(questionsInfo).map((category) => {
                return (
                  <NavDropdown.Item key={category} className={styles.navbarDropdownItem}>
                    <Link href={`/test/${category}`}>
                      <a>{category}</a>
                    </Link>
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>

            {isLoggedIn
              ? <>
                <Nav.Link onClick={() => router.replace('/profile')} className={styles.navbarLinks}>Profile</Nav.Link>
                <Nav.Link className={styles.navbarLinks} onClick={logoutHandler}>Logout</Nav.Link>
              </>
              : <Nav.Link className={styles.navbarLinks} onClick={signInHandler}>SignIn</Nav.Link>
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}
