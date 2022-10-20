import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import styles from './Header.module.scss';
import Link from 'next/link';
import { authApi } from 'libs/api/auth.api';
import { useUser } from 'libs/hooks/useUser';
import { useRouter } from 'next/router';
import { useQuestionsInfo } from 'libs/hooks';
import { useSnippetsInfo } from 'libs/hooks/snippets/useSnippetssInfo';

const Header = () => {

  const { mutateUser, isLoggedIn } = useUser();

  const logoutHandler = async () => {
    await authApi.logout();
    mutateUser({ isGuest: true });
  }

  const router = useRouter();
  const signInHandler = async () => {
    router.replace('/auth/sign-n')
  }
  const { questionsInfo, isLoadingQuestionsInfo } = useQuestionsInfo();
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

            <NavDropdown title="Snippets" className={styles.navbarLinks} >
              {Object.keys(snippetsInfo).map((category) => {
                return (
                  <NavDropdown.Item key={category} className={styles.navbarDropdownItem}>
                    <Link href={`/snippets/${snippetsInfo[category].categoryURLName}`}>
                      <a>{category}</a>
                    </Link>
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>

            <NavDropdown title="Questions" className={styles.navbarLinks} >
              {Object.keys(questionsInfo).map((category) => {
                return (
                  <NavDropdown.Item key={category} className={styles.navbarDropdownItem}>
                    <Link href={`/questions/${questionsInfo[category].categoryURLName}`}>
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
                    <Link href={`/test/${questionsInfo[category].categoryURLName}`}>
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
export default Header;