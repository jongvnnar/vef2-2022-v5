import { Events } from "../components/Events/Events";

export default function Index({ errorCode, data }) {
  return <Events events={data} />;
}

export async function getServerSideProps() {
  const url = new URL("/events", process.env.API_URL);
  const res = await fetch(url);
  const errorCode = res.ok ? false : res.statusCode;
  const json = await res.json();
  return {
    props: { errorCode, data: json.items },
  };
}
