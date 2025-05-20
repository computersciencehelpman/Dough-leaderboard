// src/pages/_app.js
import "../styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Force dark mode manually
    document.documentElement.classList.add("dark");
  }, []);

  return <Component {...pageProps} />;
}
