import { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Container,
  Grid,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import AppLayout from "layouts/AppLayout";
import contentSizeQuery from "helpers/contentSizeQuery";

// const ParticlesSection = dynamic(() => import('sections/index/ParticlesSection'), { ssr: false })

const transition = "250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms";

const Hero = styled(Box)`
  padding-top: 30px;
  padding-bottom: 80px;

  ${contentSizeQuery("small-only")`
    {
      padding-top: 16px;
      padding-bottom: 16px;
    }`}
`;

const Title = styled(Typography).attrs({
  variant: "h1",
})`
  && {
    font-weight: 700;
    color: #1d3d7b;
  }
`;

const Subtitle = styled(Typography).attrs({
  variant: "h1",
  component: "h2",
})`
  && {
    opacity: 0.75;
    line-height: 1;

    span {
      font-weight: 400;
      font-size: 0.75em;
    }
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: #0e4ecc;
  font-weight: 500;
`;

const StyledSvgIcon = styled(SvgIcon)`
  && {
    transform: scale(1);
    height: 5rem;
    width: auto;
    max-width: 100%;
    padding: 12px;
    filter: grayscale(1);
    transition: filter ${transition}, transform ${transition};

    /* There is no hovering on mobile, so let's never use grayscale filter */
    ${contentSizeQuery("small-only")`
      {
        filter: unset;
      }`}
  }
`;

const ResponsiveGridItem = styled(Grid).attrs({
  item: true,
})`
  ${contentSizeQuery("small")`
    {
      max-width: 50%;
      flex-basis: 50%;
    }`}

  ${contentSizeQuery("medium")`
    {
      max-width: 33.3%;
      flex-basis: 33.3%;
    }`}

  ${contentSizeQuery("large")`
    {
      max-width: 16.6%;
      flex-basis: 16.6%;
    }`}
`;

const ButtonWithIcon = styled(Button).attrs({
  variant: "contained",
  fullWidth: true,
})`
  && {
    align-items: start;
    height: 100%;
    text-align: center;
    background: white;
    transition: background-color ${transition}, box-shadow ${transition},
      border ${transition};

    &:hover,
    &:focus {
      ${StyledSvgIcon} {
        filter: unset;
        transform: scale(1.2);
      }
    }

    > .MuiButton-label {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

const Index = ({ countries }) => (
  <AppLayout>
    {/* <ParticlesSection /> */}
    <Container style={{ position: "relative" }}>
      <Hero
        display="flex"
        flexDirection="column"
        textAlign="center"
        justifyContent="center"
        style={{ minHeight: "calc(100vh - 90px)" }}
      >
        <Box style={{ background: "#fafafa91" }}>
          <Title>COVID-19 Data Portal</Title>
          <Subtitle color="secondary">
            <span>for the Lancet COVID-19 Commission</span>
          </Subtitle>
        </Box>
        <Box marginTop={3} style={{ background: "#fafafa91" }}>
          <Typography variant="h3" component="p">
            3.4 million data points · 216 countries · 246 days · 122 indicators
          </Typography>
        </Box>
        <Box marginTop={3} display="flex" justifyContent="center">
          <Box margin={1}>
            <Button size="large" color="primary" variant="contained">
              Download Database
            </Button>
          </Box>
          <Box margin={1}>
            <Button size="large" color="secondary" variant="contained">
              Explore Maps
            </Button>
          </Box>
        </Box>
        <Box margin={1}>
          <Typography variant="body2" style={{ color: "gray" }}>
            Last updated: 16 hours ago
          </Typography>
        </Box>
        <Box>
          {/* <Grid container spacing={2}>
            <ResponsiveGridItem>
              <Link href="/rankings" passHref>
                <ButtonWithIcon>
                  <StyledSvgIcon component={TrophySvg} />
                  Rankings
                </ButtonWithIcon>
              </Link>
            </ResponsiveGridItem>
            <ResponsiveGridItem>
              <Link href="/map" passHref>
                <ButtonWithIcon>
                  <StyledSvgIcon viewBox="0 0 36 24" component={MapIconSvg} />
                  Interactive Map
                </ButtonWithIcon>
              </Link>
            </ResponsiveGridItem>
            <ResponsiveGridItem>
              <Link href="/messages" passHref>
                <ButtonWithIcon>
                  <StyledSvgIcon component={MessagesSvg} />
                  Key Messages
                </ButtonWithIcon>
              </Link>
            </ResponsiveGridItem>
            <ResponsiveGridItem>
              <Link href="/profiles" passHref>
                <ButtonWithIcon>
                  <StyledSvgIcon component={ProfileSvg} />
                  Country Profiles
                </ButtonWithIcon>
              </Link>
            </ResponsiveGridItem>
            <ResponsiveGridItem>
              <Link href="/explorer" passHref>
                <ButtonWithIcon>
                  <StyledSvgIcon viewBox="0 0 36 24" component={ChartSvg} />
                  Data Explorer
                </ButtonWithIcon>
              </Link>
            </ResponsiveGridItem>
            <ResponsiveGridItem>
              <Link href="/downloads" passHref>
                <ButtonWithIcon>
                  <StyledSvgIcon component={DownloadSvg} />
                  Downloads
                </ButtonWithIcon>
              </Link>
            </ResponsiveGridItem>
          </Grid> */}
        </Box>
      </Hero>
    </Container>
  </AppLayout>
);

export default Index;
