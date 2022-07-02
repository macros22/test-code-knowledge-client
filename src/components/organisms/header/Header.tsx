import React from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import { HeaderProps } from "./Header.props";

export const Header = (): HeaderProps => {
  return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerBody}>
            <Link href="/">
              <a className={styles.logo}>Test JavaScript knowledge</a>
            </Link>

            <div className={styles.links}>
              <Link href="/test">
                <a className={styles.link}>Test</a>
              </Link>

              <Link href="/questions">
                <a className={styles.link}>All Questions</a>
              </Link>
            </div>
          </div>
        </div>
      </header>
  );
};
