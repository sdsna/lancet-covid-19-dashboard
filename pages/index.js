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
import WorldSvg from "static/undraw_connected_world_wuay.svg";

// const ParticlesSection = dynamic(() => import('sections/index/ParticlesSection'), { ssr: false })

const transition = "250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms";

const Hero = styled(Box)`
  padding-top: 30px;
  padding-bottom: 30px;

  ${contentSizeQuery("small-only")`
    {
      padding-top: 60px;
      padding-bottom: 60px;
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
  variant: "h2",
  component: "h2",
})`
  && {
    opacity: 0.75;
    line-height: 1;

    span {
      font-weight: 500;
      /* font-size: 0.75em; */
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
        paddingY={16}
        display="flex"
        flexDirection="column"
        textAlign="left"
        justifyContent="center"
        style={{ minHeight: "calc(100vh - 300px)" }}
      >
        <Grid container>
          <Grid item lg={7}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
              height="100%"
            >
              <Box style={{ background: "#fafafa91" }}>
                <Title>COVID-19 Data Portal</Title>
                <Subtitle color="secondary">
                  <span>for the Lancet COVID-19 Commission</span>
                </Subtitle>
              </Box>
              <Box marginTop={3} style={{ background: "#fafafa91" }}>
                <Typography variant="h3" component="p">
                  3.4 million data points · 216 countries · 246 days · 122
                  indicators
                </Typography>
              </Box>
              <Box marginTop={3} display="flex" justifyContent="flex-start">
                <Box marginY={1} marginRight={2}>
                  <Button size="large" color="primary" variant="contained">
                    Download Database
                  </Button>
                </Box>
                <Box marginY={1}>
                  <Button size="large" color="secondary" variant="contained">
                    Explore Maps
                  </Button>
                </Box>
              </Box>
              <Box marginY={1}>
                <Typography variant="body2" style={{ color: "gray" }}>
                  Last updated: 16 hours ago
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={5}>
            <WorldSvg style={{ maxWidth: "100%", height: "auto" }} />
          </Grid>
        </Grid>
        <Box style={{ position: "absolute", top: 0 }}>
          <Grid container>
            <Grid item xs={6}>
              &nbsp;
            </Grid>
          </Grid>
        </Box>
      </Hero>
      <Box>
        <Typography variant="h2" style={{ fontWeight: 500 }} gutterBottom>
          About
        </Typography>
        <Typography variant="body1" gutterBottom>
          This is the data portal of the Lancet Commission on COVID-19. The data
          portal is updated every day. It provides access to the latest data
          available on COVID-19 new cases, death rate, test rate and other
          valuable data to gauge the transmission and response to the pandemic.
          Data are pooled from difference sources.
        </Typography>
        <Typography variant="body1">
          Based on the methodology described in Lancet COVID-19 Commission
          Statement on the occasion of the 75th session of the UN General
          Assembly we update every day an assessment of the overall transmission
          of the virus to gauge which countries have suppressed the virus and
          which countries are struggling to suppress the spread of COVID-19. It
          is based on five key measures: New cases per million, New death per
          million, Tests per case and the Effective Reproduction Rate.
        </Typography>
        <Box marginY={3}>
          <iframe
            src="/overall-transmission/embed"
            style={{
              width: "100%",
              height: 500,
              border: "1px solid rgba(0,0,0,.1)",
            }}
          />
        </Box>
      </Box>
    </Container>
  </AppLayout>
);

export default Index;
