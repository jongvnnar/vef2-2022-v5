import styles from "../../styles/Layout.module.scss";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
export function Layout({ title, children }) {
  return (
    <div className={styles.layout}>
      <Header title={title} />
      <main>{children}</main>
      <footer className={styles.layout__footer}>
        <Footer />
      </footer>
    </div>
  );
}
