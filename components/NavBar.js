import { useState } from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  Container,
  Divider,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "mdi-material-ui";
import styled from "styled-components";
import NavBarDrawer from "components/NavBarDrawer";
import NavBarButton from "components/NavBarButton";
import getIndicatorMapHref from "helpers/getIndicatorMapHref";
import { useStore } from "helpers/uiStore";
import getTheme from "helpers/getTheme";
import INDICATORS from "helpers/indicators";

const { breakpoints } = getTheme();

const VerticalDivider = styled(Box)`
  border-left: 1px solid rgba(6, 177, 216, 0.37);
  height: 75%;
  align-self: center;
`;

const StyledToolbar = styled(Toolbar)`
  && {
    min-height: 64px;
    height: 64px
    max-height: 64px;
    border-bottom: 3px solid ${(props) => props.theme.palette.primary.main};

    ${breakpoints.up("sm")} {
      min-height: 88px;
      height: 88px;
      max-height: 88px;
    }
  }
`;

const DesktopOnlyBox = styled(Box).attrs({
  flexGrow: 1,
})`
  height: 100%;
  display: flex;

  ${breakpoints.down("sm")} {
    display: none;
  }
`;

const pages = [
  {
    label: "Indicators",
    href: "/indicators",
  },
  {
    label: "Interactive Maps",
    href: "/map",
    subpages: [
      ...INDICATORS.map((indicator) => ({
        label: indicator.name,
        href: getIndicatorMapHref(indicator),
      })),
      {
        label: "More coming soon...",
        href: "coming-soon",
        disabled: true,
      },
    ],
  },
];

const NavBar = observer(({ fluid }) => {
  const uiStore = useStore();

  let containerProps = { maxWidth: "lg", style: { padding: "0 8px" } };

  if (fluid) containerProps = { maxWidth: false };

  const [showNavDrawer, setShowNavDrawer] = useState(false);
  const toggleNavDrawer = () => setShowNavDrawer(!showNavDrawer);

  const TITLE = "COVID-19 Data Portal";

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <StyledToolbar disableGutters={true}>
          <Container
            {...containerProps}
            disableGutters={true}
            style={{
              alignSelf: "stretch",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Hidden implementation="css" mdUp>
              <Box display="flex">
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleNavDrawer}
                >
                  <Menu />
                </IconButton>
              </Box>
            </Hidden>
            <NavBarButton href="/" label={TITLE} />
            <Hidden implementation="js" mdUp>
              <NavBarDrawer
                open={showNavDrawer}
                onClose={toggleNavDrawer}
                title={TITLE}
                pages={pages}
                openDownloadDatabaseDialog={uiStore.openDownloadDatabaseDialog}
              />
            </Hidden>
            <DesktopOnlyBox>
              {pages.map(({ label, href, subpages }) => (
                <NavBarButton
                  key={href}
                  label={label}
                  href={href}
                  subpages={subpages}
                />
              ))}
              <Box flexGrow={1} />
              <VerticalDivider />
              <NavBarButton
                label="Lancet Commission"
                href="https://covid19commission.org"
                external={true}
              />
              <VerticalDivider />
              <NavBarButton
                label="Download Database"
                onClick={uiStore.openDownloadDatabaseDialog}
              />
            </DesktopOnlyBox>
          </Container>
        </StyledToolbar>
      </AppBar>
      <StyledToolbar />
    </>
  );
});

export default NavBar;
