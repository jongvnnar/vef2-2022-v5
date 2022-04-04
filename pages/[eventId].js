import { Event } from "../components/Event/Event";
import Head from "next/head";
export default function EventPage({ data, error }) {
  if (error) {
    return <p>Villa kom upp við að sækja gögn</p>;
  }
  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>
      <Event event={data} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { eventId } = context.query;
  let error = false;
  let data;
  try {
    const url = new URL(`/events/${eventId}`, process.env.NEXT_PUBLIC_API_URL);
    const res = await fetch(url);
    data = await res.json();
    if (res.status === 404) {
      return {
        notFound: true,
      };
    }
    if (!res.ok) {
      error = true;
    }
  } catch (e) {
    error = true;
  }
  return { props: { data, error } };
}
