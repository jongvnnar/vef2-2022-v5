import Head from "next/head";

export function Header({ title = "" }) {
  return (
    <>
      <Head>
        <title>{title || "Viðburðasíðan"}</title>
        <meta name="description" content="Verkefni í vefforritun 2, 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {title && (
        <header>
          <h1>{title}</h1>
        </header>
      )}
    </>
  );
}
