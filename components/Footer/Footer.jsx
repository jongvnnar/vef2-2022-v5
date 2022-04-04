import { useContext, useState, useEffect } from "react";
import styles from "../../styles/Login.module.scss";
import { AuthContext } from "../Auth/Auth";
import Link from "next/link";
import { Button } from "../Button/Button";
export function Footer() {
  const { user, logoutUser, authenticated } = useContext(AuthContext);
  if (authenticated) {
    return (
      <>
        <Link href="/">
          <a>Forsíða</a>
        </Link>
        <p className={styles.user__loggedin}>
          Innskráður sem: <strong>{user.name}</strong>
        </p>
        <Button onClick={logoutUser}>Útskrá</Button>
      </>
    );
  }

  return (
    <>
      <Link href="/">
        <a>Forsíða</a>
      </Link>
      <Link href="/login">
        <a>Innskráning</a>
      </Link>
      <Link href="/register">
        <a>Nýskráning</a>
      </Link>
    </>
  );
}
