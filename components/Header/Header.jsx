import Head from "next/head";

export function Header({ title = "Viðburðasíðan" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Verkefni í vefforritun 2, 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>{title}</h1>
      </header>
    </>
  );
}
