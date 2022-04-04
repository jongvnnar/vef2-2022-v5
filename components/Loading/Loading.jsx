import ReactLoading from "react-loading";
import styles from "../../styles/Loading.module.scss";
export function Loading({ color = "#666" }) {
  return (
    <ReactLoading
      className={styles.loading}
      type={"spokes"}
      color={color}
      height="10%"
      width="10%"
    />
  );
}
