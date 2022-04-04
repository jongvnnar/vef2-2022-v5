import { useRouter } from "next/router";

export default function EventPage() {
  const router = useRouter();
  const { eventId } = router.query;
  return <p>event: {eventId}</p>;
}
