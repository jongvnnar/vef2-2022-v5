import "../styles/globals.scss";
import { Layout } from "../components/Layout/Layout";
import { AuthWrapper } from "../components/Auth/Auth";
function MyApp({ Component, pageProps }) {
  return (
    <AuthWrapper>
      <Layout title={Component.title}>
        <Component {...pageProps} />
      </Layout>
    </AuthWrapper>
  );
}

export default MyApp;
