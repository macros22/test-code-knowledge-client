import { useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BsFillBrightnessHighFill, BsFillMoonStarsFill } from 'react-icons/bs';
import { ThemeContext } from 'contexts/theme.context';
import { authApi } from 'libs/api/auth.api';
import { useQuestionsInfo, useSnippetsInfo, useUser } from 'libs/hooks';
import { useRouter } from 'next/router';

import styles from './Header.module.scss';
import { Logo } from './Logo';
import { QuestionsOptions } from './QuestionsOptions';
import { SnippetsOptions } from './SnippetsOptions';
import { TestOptions } from './TestOptions';

export const Header = () => {
  const { mutateUser, isLoggedIn } = useUser();
  const { isDark, toggleDark } = useContext(ThemeContext);

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
    <Navbar expand="lg" className={styles.navbar}>
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
                  className={styles.navbarLinks}>
                  Profile
                </Nav.Link>
                <Nav.Link
                  className={styles.navbarLinks}
                  onClick={logoutHandler}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link className={styles.navbarLinks} onClick={signInHandler}>
                SignIn
              </Nav.Link>
            )}
            <span
              tabIndex={0}
              role="button"
              aria-label="light"
              onClick={toggleDark}
              onKeyDown={toggleDark}>
              <span>
                {isDark ? (
                  <BsFillBrightnessHighFill />
                ) : (
                  <BsFillMoonStarsFill />
                )}
              </span>
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
