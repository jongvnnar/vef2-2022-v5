import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../../styles/Event.module.scss";
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
        <h1 className={styles.event__title}>{event.name}</h1>
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
        eventId={event.id}
      />
      <Link href="/">
        <a>Til baka</a>
      </Link>
    </section>
  );
}
