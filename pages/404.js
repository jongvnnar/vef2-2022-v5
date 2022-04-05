import Link from "next/link";
NotFound.title = "Síða fannst ekki";
export default function NotFound() {
  return (
    <section>
      <h2>Error: 404</h2>
      <Link href="/" className="link">
        <a>Til baka á forsíðu</a>
      </Link>
    </section>
  );
}
