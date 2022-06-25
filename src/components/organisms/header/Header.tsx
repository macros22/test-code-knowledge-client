import React from "react";
import styles from "./Header.module.scss";
import Link from "next/link";

export const Header = () => {
  
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerBody}>
            <Link href="/">
              <a className={styles.logo}>Test JavaScript knowledge</a>
            </Link>

          </div>
        </div>
      </header>
     
    </>
  );
};


