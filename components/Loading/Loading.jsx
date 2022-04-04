import ReactLoading from "react-loading";
import styles from "../../styles/Loading.module.scss";
export function Loading({ color = "#666", size = "10%" }) {
  return (
    <ReactLoading
      className={styles.loading}
      type={"spokes"}
      color={color}
      height={size}
      width={size}
    />
  );
}
