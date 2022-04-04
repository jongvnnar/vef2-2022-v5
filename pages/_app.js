import "../styles/globals.scss";
import { Layout } from "../components/Layout/Layout";
import { Login } from "../components/Login/Login";
function MyApp({ Component, pageProps }) {
  return (
    <Layout title="Viðburðasíðan" footer={<Login />}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
