import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../../styles/Events.module.scss";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";

export function Event({ event }) {
  const [registrations, setRegistrations] = useState([]);
  useEffect(() => {
    if (event && event.registrations && event.registrations.length > 0) {
      setRegistrations(event.registrations);
    }
  }, [event, event?.registrations]);
  if (!event) {
    return <p>Engar upplýsingar fundust um þennan viðburð :(</p>;
  }
  return (
    <section>
      <div className={styles.event__info}>
        <h2 className={styles.event__title}>{event.name}</h2>
        <p className={styles.event__subtitle}>{event.description}</p>
      </div>

      <div className={styles.event__registered}>
        {registrations.length === 0 ? (
          <p>Enginn hefur skráð sig á þennan viðburð</p>
        ) : (
          <ul>
            {registrations.map((entry, index) => {
              return (
                <li
                  key={index.toString()}
                  className={styles.event__registeredItem}
                >
                  <span className={styles.event__registeredName}>
                    {entry.name}
                  </span>
                  {entry.comment && (
                    <span className={styles.event__registeredComment}>
                      {entry.comment}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <RegistrationForm
        registrations={registrations}
        setRegistrations={setRegistrations}
      />
      <Link className="link" to="/">
        Til baka
      </Link>
    </section>
  );
}
