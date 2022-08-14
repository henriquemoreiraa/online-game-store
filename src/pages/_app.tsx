import React from "react";
import "../styles/global.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return <Component {...pageProps} />;
}

export default MyApp;
