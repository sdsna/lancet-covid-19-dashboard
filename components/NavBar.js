import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  ButtonBase,
  Container,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "mdi-material-ui";
import styled from "styled-components";
import NavBarDrawer from "components/NavBarDrawer";
import getTheme from "helpers/getTheme";
import INDICATORS from "helpers/indicators";

const { breakpoints } = getTheme();

const Button = styled(ButtonBase).attrs({
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

const HoverButton = styled(Button)`
  && {
    opacity: 0.7;
    transition: opacity 0.3s;
  }

  &&:hover {
    opacity: 1;
  }
`;

const Logo = styled.img``;

const LogoButton = styled(Button)`
  ${breakpoints.down("sm")} {
    flex-grow: 1;
  }
`;

const StyledToolbar = styled(Toolbar)`
  && {
    min-height: 64px;
    height: 64px
    max-height: 64px;

    ${Logo} {
      height: 64px;
      padding: 8px 0;
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

const NavBar = ({ fluid }) => {
  let containerProps = { maxWidth: "lg", style: { padding: "0 8px" } };

  if (fluid) containerProps = { maxWidth: false };

  const [showNavDrawer, setShowNavDrawer] = useState(false);
  const toggleNavDrawer = () => setShowNavDrawer(!showNavDrawer);

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Container {...containerProps} disableGutters={true}>
          <StyledToolbar disableGutters={true}>
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
            </DesktopOnlyBox>
          </StyledToolbar>
        </Container>
      </AppBar>
      <StyledToolbar />
    </>
  );
};

export default NavBar;
