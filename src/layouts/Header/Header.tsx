import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import styles from './Header.module.scss';
import { authApi } from 'libs/api/auth.api';
import { useRouter } from 'next/router';
import { useSnippetsInfo, useQuestionsInfo, useUser } from 'libs/hooks';
import { TestOptions } from './TestOptions';
import { QuestionsOptions } from './QuestionsOptions';
import { SnippetsOptions } from './SnippetsOptions';
import { Logo } from './Logo';

const Header = () => {
  const { mutateUser, isLoggedIn } = useUser();

  const logoutHandler = async () => {
    await authApi.logout();
    mutateUser({ isGuest: true });
  };

  const router = useRouter();
  const signInHandler = async () => {
    router.replace('/auth/sign-n');
  };
  const { questionsInfo, isLoadingQuestionsInfo } = useQuestionsInfo();
  const { snippetsInfo } = useSnippetsInfo();

  return (
    <Navbar bg="white" expand="lg" className={styles.navbar}>
      <Container>
        <Logo />
        <Navbar.Toggle className={styles.burgerMenu} />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown title="Snippets" className={styles.navbarLinks}>
              <SnippetsOptions snippetsInfo={snippetsInfo} />
            </NavDropdown>

            <NavDropdown title="Questions" className={styles.navbarLinks}>
              <QuestionsOptions questionsInfo={questionsInfo} />
            </NavDropdown>

            <NavDropdown title="Test" className={styles.navbarLinks}>
              <TestOptions questionsInfo={questionsInfo} />
            </NavDropdown>

            {isLoggedIn ? (
              <>
                <Nav.Link
                  onClick={() => router.replace('/profile')}
                  className={styles.navbarLinks}
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  className={styles.navbarLinks}
                  onClick={logoutHandler}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link className={styles.navbarLinks} onClick={signInHandler}>
                SignIn
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
