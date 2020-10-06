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
import { useStore } from "helpers/uiStore";
import getTheme from "helpers/getTheme";
import INDICATORS from "helpers/indicators";

const { breakpoints } = getTheme();

const StyledButtonBase = styled(ButtonBase).attrs({
  component: "a",
})`
  && {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-self: stretch;
    padding: 0 16px;
  }
`;

const HoverButton = styled(StyledButtonBase)`
  transition: background 0.3s ease-in-out;

  &&:hover {
    background: ${(props) => props.theme.palette.primary.main};
  }
`;

const VerticalDivider = styled(Box)`
  border-left: 1px solid rgba(6, 177, 216, 0.37);
  height: 75%;
  align-self: center;
`;

const Logo = styled.img``;

const LogoButton = styled(StyledButtonBase)`
  ${breakpoints.down("sm")} {
    flex-grow: 1;
  }
`;

const StyledToolbar = styled(Toolbar)`
  && {
    min-height: 64px;
    height: 64px
    max-height: 64px;
    border-bottom: 3px solid ${(props) => props.theme.palette.primary.main};

    ${Logo} {
      height: 64px;
    $  padding: 8px 0;
    }

    ${breakpoints.up("sm")} {
      min-height: 88px;
      height: 88px;
      max-height: 88px;

      ${Logo} {
        height: 88px;
        padding: 12px 0;
      }
    }
  }
`;

const DesktopOnlyBox = styled(Box)`
  height: 100%;
  display: flex;

  ${breakpoints.down("sm")} {
    display: none;
  }
`;

const pages = INDICATORS.map((indicator) => ({
  label: indicator.name,
  href: `/${indicator.slug}`,
}));

const NavBar = observer(({ fluid }) => {
  const uiStore = useStore();

  let containerProps = { maxWidth: "lg", style: { padding: "0 8px" } };

  if (fluid) containerProps = { maxWidth: false };

  const [showNavDrawer, setShowNavDrawer] = useState(false);
  const toggleNavDrawer = () => setShowNavDrawer(!showNavDrawer);

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
                <Link href="/" passHref>
                  <HoverButton>
                    <Typography variant="body1" style={{ fontWeight: 700 }}>
                      COVID-19 Data Platform
                    </Typography>
                  </HoverButton>
                </Link>
              </Box>
            </Hidden>
            <Hidden implementation="css" mdUp>
              <IconButton
                style={{ visibility: "hidden" }}
                color="inherit"
                aria-label="menu"
              >
                <Menu />
              </IconButton>
            </Hidden>
            <Hidden implementation="js" mdUp>
              <NavBarDrawer
                open={showNavDrawer}
                onClose={toggleNavDrawer}
                pages={pages}
              />
            </Hidden>
            <DesktopOnlyBox>
              <Link href="/" passHref>
                <HoverButton>
                  <Typography variant="body1" style={{ fontWeight: 700 }}>
                    Home
                  </Typography>
                </HoverButton>
              </Link>
              {pages.map(({ label, href }) => (
                <Link key={href} href={href} passHref>
                  <HoverButton>
                    <Typography variant="body1">{label}</Typography>
                  </HoverButton>
                </Link>
              ))}
              <VerticalDivider />
              <HoverButton
                component="a"
                target="_blank"
                href="https://covid19commission.org"
              >
                <Typography variant="body1">Lancet Commission</Typography>
              </HoverButton>
              <VerticalDivider />
              <HoverButton onClick={uiStore.openDownloadDatabaseDialog}>
                <Typography variant="body1">Download Database</Typography>
              </HoverButton>
            </DesktopOnlyBox>
          </Container>
        </StyledToolbar>
      </AppBar>
      <StyledToolbar />
    </>
  );
});

export default NavBar;
