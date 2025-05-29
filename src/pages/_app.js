// src/pages/_app.js
import "../styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Force dark mode on initial load
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return <Component {...pageProps} />;
}
