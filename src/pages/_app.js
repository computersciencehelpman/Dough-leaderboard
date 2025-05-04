// src/pages/_app.js or src/app/layout.js
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
