import styles from "./styles.module.scss";
import { ActiveLink } from "../ActiveLink";
export function Header() {
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <span>
            <img src="/images/logo.png" alt="pinkcode" />
            PostCode
          </span>
          <nav>
            <ActiveLink activeClassName={styles.active} href="/">
              <a>Posts</a>
            </ActiveLink>
          </nav>
        </div>
      </header>
    </>
  );
}
