import styles from "../../styles/Button.module.scss";
import classNames from "classnames";
export function Button({ onClick, children, margin = false, large = false }) {
  const classes = [
    styles.button,
    margin ? styles["button--margin"] : "",
    large ? styles["button--large"] : "",
  ];
  return (
    <button
      className={classNames(
        styles.button,
        margin && styles["button--margin"],
        large && styles["button--large"]
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
