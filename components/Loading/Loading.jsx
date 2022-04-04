import ReactLoading from "react-loading";
import styles from "../../styles/Loading.module.scss";
export function Loading() {
  return (
    <ReactLoading
      className={styles.loading}
      type={"spokes"}
      color={"#666"}
      height="10%"
      width="10%"
    />
  );
}
