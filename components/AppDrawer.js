import { useEffect } from "react";
import Router from "next/router";
import { reaction } from "mobx";
import { observer } from "mobx-react-lite";
import { Box, Drawer, Hidden } from "@material-ui/core";
import styled from "styled-components";
import { useStore } from "helpers/uiStore";
import * as gtag from "helpers/gtag";

const StyledDrawer = styled(Drawer).attrs(({ width, PaperProps }) => ({
  style: {
    width: width,
  },
  PaperProps: {
    ...PaperProps,
    ...{
      style: {
        width: width,
      },
    },
  },
}))`
  && {
    ${(props) => (props.open ? null : "width: 0px !important;")}
    transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }

  &,
  & > div {
    top: ${(props) => (props.styled.isEmbedded ? "0" : "88px")};
    bottom: 0px;
    height: auto;
    overflow-y: hidden;
    /* Display below the navbar */
    z-index: 1000;
    overflow-wrap: break-word;
  }
`;

const LeftDrawerBox = styled(Box).attrs({
  id: "desktop-drawer",
})`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
`;

const BottomDrawerBox = styled(Box).attrs({
  id: "mobile-drawer",
})`
  max-height: calc(80vh);
  overflow-y: auto;
  scrollbar-width: thin;
`;

// scrolls the context menu back to the top
const scrollElementToTop = (elementId) => {
  const element = document?.getElementById(elementId);

  if (!element) return;

  element.scrollTop = 0;
};

const AppDrawer = observer(({ children, permanent = false, isEmbedded }) => {
  const uiStore = useStore();

  // Close and clear drawer when changing route
  useEffect(() => {
    const handleRouteChange = (url) => {
      uiStore.closeDrawer();
      uiStore.clearTarget();
    };

    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    scrollElementToTop("desktop-drawer");
    scrollElementToTop("mobile-drawer");
  });

  // Track target change in Google Analytics
  useEffect(() => {
    const disposeReaction = reaction(
      () => uiStore.target,
      (target) => {
        if (!target) return;

        gtag.event({
          action: "view",
          category: "sideMenu",
          label: `Target: ${target.id}`,
        });
      }
    );
    return () => {
      disposeReaction();
    };
  }, []);

  const showDrawer = uiStore.showDrawer || permanent;

  // If we have no target, do not render children
  if (!uiStore.target && !permanent) children = null;

  return (
    <>
      <Hidden implementation="css" only="xs">
        <Hidden only="xs" initialWidth="lg">
          <StyledDrawer
            open={showDrawer}
            variant="persistent"
            anchor="left"
            width={300}
            PaperProps={{
              elevation: 2,
            }}
            styled={{ isEmbedded }}
          >
            <LeftDrawerBox>{children}</LeftDrawerBox>
          </StyledDrawer>
        </Hidden>
      </Hidden>
      <Hidden smUp>
        <Drawer
          open={uiStore.showDrawer}
          onClose={uiStore.closeDrawer}
          variant="temporary"
          anchor="bottom"
        >
          <BottomDrawerBox>{children}</BottomDrawerBox>
        </Drawer>
      </Hidden>
    </>
  );
});

export default AppDrawer;
