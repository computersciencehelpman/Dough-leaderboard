// src/pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html> {/* DO NOT set class="dark" here when it's toggled in _app.js */}
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
