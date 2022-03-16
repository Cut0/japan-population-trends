import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
