import Link from "next/link";
import styles from "../../styles/Events.module.scss";
export function Events({ events }) {
  return (
    <section className={styles.events}>
      <h2>Viðburðir á næstunni</h2>
      {events.length !== 0 ? (
        <ul>
          {events.map((event) => {
            return (
              <li key={event.id} className={styles.events__event}>
                <Link
                  href={`/${event.id}`}
                  className={styles.events__eventLink}
                >
                  <a>{event.name}</a>
                </Link>
                <p className={styles.events__eventDescription}>
                  {event.description}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Engir viðburðir á næstunni!</p>
      )}
    </section>
  );
}
