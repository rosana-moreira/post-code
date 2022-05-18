import styles from "./styles.module.scss";
import { ActiveLink } from "../ActiveLink";
export function Header() {
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <span>
            <img src="/images/logo.png" alt="pinkcode" />
            PinkCode
          </span>
          <nav>
            <ActiveLink activeClassName={styles.active} href="/">
              <a>Home</a>
            </ActiveLink>
            <ActiveLink activeClassName={styles.active} href="/posts">
              <a>Posts</a>
            </ActiveLink>
          </nav>
          <ActiveLink activeClassName={styles.active} href="/contacts">
            <a>Contato</a>
          </ActiveLink>
        </div>
      </header>
    </>
  );
}
