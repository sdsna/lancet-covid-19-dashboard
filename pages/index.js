import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  Typography,
} from "@material-ui/core";
import styled, { keyframes } from "styled-components";
import AppLayout from "layouts/AppLayout";
import contentSizeQuery from "helpers/contentSizeQuery";
import WorldSvg from "static/undraw_connected_world_wuay.svg";

const transition = "250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms";

const animateStrokeDashOffset = keyframes`
  from {
    stroke-dashoffset: 0%;
  }

  to {
    stroke-dashoffset: 100%;
  }
`;

const animateStrokeWidth = keyframes`
  0% {
    stroke-width: 0;
  }

  5% {
    stroke-width: 10;
  }

  10%, 100% {
    stroke-width: 0;
  }
`;

const AnimatedWorldSvg = styled(WorldSvg)`
  .connections {
    animation: ${animateStrokeDashOffset} 100s linear infinite;
  }

  .circles {
    stroke: black;

    circle:nth-of-type(1) {
      animation: ${animateStrokeWidth} 5s linear infinite 1s;
    }

    circle:nth-of-type(2) {
      animation: ${animateStrokeWidth} 5s linear infinite 1.1s;
    }

    circle:nth-of-type(3) {
      animation: ${animateStrokeWidth} 5s linear infinite 1.9s;
    }

    circle:nth-of-type(4) {
      animation: ${animateStrokeWidth} 5s linear infinite 2s;
    }

    circle:nth-of-type(5) {
      animation: ${animateStrokeWidth} 5s linear infinite 1.5s;
    }
  }
`;

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
  }
`;

const Subtitle = styled(Typography).attrs({
  variant: "h2",
  component: "h2",
})`
  && {
    opacity: 0.75;
    line-height: 1;
    font-weight: 500;
  }
`;

const StyledLink = styled(Typography).attrs({
  compontent: "a",
  color: "primary",
})`
  text-decoration: none;
  font-weight: 500;
`;

const Index = ({ countries }) => (
  <AppLayout>
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
          <Grid item lg={7} md={8} xs={12}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
              height="100%"
            >
              <Box>
                <Title color="primary">COVID-19 Data Portal</Title>
                <Subtitle color="secondary">
                  for the Lancet COVID-19 Commission
                </Subtitle>
              </Box>
              <Box marginTop={3}>
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
                  <Button size="large" color="secondary" variant="outlined">
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
          <Grid item lg={5} md={4} xs={0}>
            <Hidden implementation="css" smDown>
              <AnimatedWorldSvg style={{ maxWidth: "100%", height: "auto" }} />
            </Hidden>
          </Grid>
        </Grid>
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
