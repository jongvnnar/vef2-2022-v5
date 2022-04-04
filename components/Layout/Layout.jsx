import styles from "../../styles/Layout.module.scss";
import Head from "next/head";

export function Layout({ footer, children }) {
  return (
    <div className={styles.layout}>
      <main>{children}</main>
      <footer className={styles.layout__footer}>{footer}</footer>
    </div>
  );
}
