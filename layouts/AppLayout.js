import Head from "next/head";
import { observer, useLocalStore } from "mobx-react-lite";
import ResizeObserver from "react-resize-observer";
import { Box } from "@material-ui/core";
import NavBar from "components/NavBar";
import DownloadDatabaseDialog from "components/DownloadDatabaseDialog";
import Footer from "components/Footer";
import AppDrawer from "components/AppDrawer";

const AppLayout = observer(
  ({
    fluid = false,
    overflow = "auto",
    children,
    Drawer = null,
    drawerProps = {},
    onContentResize = null,
    footer = true,
    isEmbedded = false,
    title = null,
  }) => {
    const store = useLocalStore(() => ({
      width: null,
      onResize(rect) {
        // Trigger custom user resize
        onContentResize ? onContentResize(rect) : null;

        const { width } = rect;

        if (width <= 600) {
          this.width = "small";
        } else if (width <= 960) {
          this.width = "medium";
        } else if (width > 960) {
          this.width = "large";
        }
      },
    }));

    return (
      <>
        <Head>
          <title>
            {title ? `${title} - ` : ""}COVID-19 Data Portal of the Lancet
            COVID-19 Commission
          </title>
        </Head>
        {isEmbedded ? null : <NavBar fluid={fluid} />}
        <Box display="flex" flexGrow={1} overflow={overflow}>
          <AppDrawer {...drawerProps} isEmbedded={isEmbedded}>
            {Drawer}
          </AppDrawer>
          <DownloadDatabaseDialog />
          <Box
            id="content"
            display="flex"
            flexGrow={1}
            flexDirection="column"
            position="relative"
            overflow={overflow}
            className={store.width}
          >
            <ResizeObserver onResize={store.onResize} />
            {children}
            {footer ? <Footer /> : null}
          </Box>
        </Box>
      </>
    );
  }
);

export default AppLayout;
