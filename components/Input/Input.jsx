import styles from "../../styles/Input.module.scss";
import classNames from "classnames";

export function Input({
  label,
  name,
  value,
  setValue,
  isError = false,
  textarea = false,
  type = "text",
  error = "",
}) {
  return (
    <div
      className={classNames(
        styles.field,
        isError && styles["field--invalid"],
        textarea && styles["field--textarea"]
      )}
    >
      <label htmlFor={name}>{label}</label>
      {!textarea ? (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      {isError && <p className={styles.error__text}>{error}</p>}
    </div>
  );
}
