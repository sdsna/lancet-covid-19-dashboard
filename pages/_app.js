import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { useEffect } from "react";
import { useStaticRendering } from "mobx-react-lite";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import NextNProgress from "nextjs-progressbar";
import { StoreProvider } from "helpers/uiStore";
import getTheme from "helpers/getTheme";
import * as gtag from "helpers/gtag";

function MyApp({ Component, pageProps }) {
  // use static rendering in SSR mode
  if (typeof window === "undefined") {
    useStaticRendering(true);
  }

  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // Track pages
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  const theme = getTheme();

  return (
    <>
      <Head>
        <title>COVID-19 Data Portal of the Lancet COVID-19 Commission</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <NextNProgress color={theme.palette.primary.main} />
      <StoreProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </StoreProvider>
    </>
  );
}

export default MyApp;
