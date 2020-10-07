import { Box, Container, Paper, Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import contentSizeQuery from "helpers/contentSizeQuery";

const FooterTypography = styled(Typography).attrs({
  variant: "body2",
})`
  && {
    color: #fff;
  }
`;

const FooterLink = styled.a`
  color: #fff;
  font-weight: 500;
`;

const ResponsiveGridItem = styled(Grid).attrs({
  item: true,
})`
  flex-basis: ${(props) => props.styled.width * 100}%;
  max-width: ${(props) => props.styled.width * 100}%;
`;

const Logo = styled.img`
  height: 80px;
`;

const BoxWithShadow = styled(Box)`
  box-shadow: 0px -2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

  background: ${(props) => props.theme.palette.secondary.dark};
  border-bottom: 5px solid ${(props) => props.theme.palette.primary.main};
`;

const Footer = () => {
  const theme = useTheme();

  return (
    <BoxWithShadow marginTop={8} paddingY={8} position="relative" theme={theme}>
      <Container maxWidth="lg">
        <Grid container>
          <ResponsiveGridItem styled={{ width: 3 / 3 }}>
            <FooterTypography gutterBottom>
              This is the data portal of the{" "}
              <FooterLink href="https://covid19commission.org/" target="_blank">
                Lancet Commission on COVID-19
              </FooterLink>
              . The data portal is updated daily from Monday to Friday. It
              provides access to the latest data available on COVID-19, such as
              new cases, deaths, positive test rate, and other valuable data to
              gauge the transmission and response to the pandemic. Data is
              pooled from different sources, including Johns Hopkins University,
              Our World in Data, Oxford, YouGov, and Google.
            </FooterTypography>
            <FooterTypography gutterBottom>
              Our database and data portal are open source. The source code is
              available on GitHub:{" "}
              <FooterLink
                href="https://github.com/sdsna/lancet-covid-19-database/"
                target="_blank"
              >
                Database
              </FooterLink>{" "}
              ·{" "}
              <FooterLink
                href="https://github.com/sdsna/lancet-covid-19-dashboard"
                target="_blank"
              >
                Data Portal
              </FooterLink>
            </FooterTypography>
            <FooterTypography gutterBottom>
              For questions, comments, and suggestions, please contact{" "}
              <FooterLink href="mailto:finn.woelm@unsdsn.org" target="_blank">
                finn.woelm@unsdsn.org
              </FooterLink>{" "}
              or{" "}
              <FooterLink href="mailto:ime2111@columbia.edu" target="_blank">
                ime2111@columbia.edu
              </FooterLink>
              .
            </FooterTypography>
          </ResponsiveGridItem>
        </Grid>
      </Container>
    </BoxWithShadow>
  );
};

export default Footer;
