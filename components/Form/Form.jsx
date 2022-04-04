import { Button } from "../Button/Button";
import styles from "../../styles/Form.module.scss";
export function Form({ children, buttonName, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={styles.form}
    >
      {children}
      <Button>{buttonName}</Button>
    </form>
  );
}
