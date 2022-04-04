import Link from "next/link";
export default function NotFound() {
  return (
    <section>
      <h2>Error: 404</h2>
      <h3>Síða fannst ekki</h3>
      <Link href="/" className="link">
        <a>Til baka á forsíðu</a>
      </Link>
    </section>
  );
}
