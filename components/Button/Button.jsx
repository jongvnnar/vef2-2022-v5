import styles from "../../styles/Button.module.scss";
import classNames from "classnames";
import { Loading } from "../Loading/Loading";
export function Button({
  onClick,
  children,
  margin = false,
  large = false,
  loading = false,
}) {
  return (
    <button
      disabled={loading}
      className={classNames(
        styles.button,
        margin && styles["button--margin"],
        large && styles["button--large"]
      )}
      onClick={onClick}
    >
      {loading ? <Loading color="#000" size="5%" /> : children}
    </button>
  );
}
