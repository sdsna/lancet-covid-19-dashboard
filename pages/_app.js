import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { useEffect } from "react";
import { useStaticRendering } from "mobx-react-lite";
import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import NextNProgress from "nextjs-progressbar";
import { ThemeProvider } from "styled-components";
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
          name="description"
          content="The COVID-19 Data Portal of the Lancet Commission on COVID-19 contains over 3 million data points and more than 100 indicator, updated daily."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@UNSDSN" />
        <meta
          name="twitter:title"
          content="COVID-19 Data Portal of the Lancet COVID-19 Commission"
        />
        <meta
          name="twitter:description"
          content="The COVID-19 Data Portal of the Lancet Commission on COVID-19 contains over 3 million data points and more than 100 indicator, updated daily."
        />
        <meta
          name="twitter:image"
          content="https://data.covid19commission.org/static/map-overall-transmission.png"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          property="og:title"
          content="COVID-19 Data Portal of the Lancet COVID-19 Commission"
        />
        <meta
          property="og:image"
          content="https://data.covid19commission.org/static/map-overall-transmission.png"
        />
        <meta
          property="og:description"
          content="The COVID-19 Data Portal of the Lancet Commission on COVID-19 contains over 3 million data points and more than 100 indicator, updated daily."
        />
        <meta property="og:url" content="https://data.covid19commission.org/" />
      </Head>
      <NextNProgress color={theme.palette.primary.main} />
      <StoreProvider>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </MuiThemeProvider>
      </StoreProvider>
    </>
  );
}

export default MyApp;
