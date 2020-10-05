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
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ResponsiveGridItem = styled(Grid).attrs({
  item: true,
})`
  flex-basis: ${(props) => props.styled.width * 100}%;
  max-width: ${(props) => props.styled.width * 100}%;

  ${contentSizeQuery("medium-down")`
    {
      max-width: 100%;
      flex-basis: 100%;

      text-align: center;
      &:not(:first-of-type) {
        margin-top: 16px;
      }
    }`}
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
          <ResponsiveGridItem styled={{ width: 1 / 3 }}>
            <Logo
              alt="Logo"
              src="/static/logo.svg"
              style={{ height: 80, marginBottom: 8 }}
            />
          </ResponsiveGridItem>
          <ResponsiveGridItem styled={{ width: 2 / 3 }}>
            <FooterTypography gutterBottom>
              This is the data portal of the Lancet Commission on COVID-19. The
              data portal is updated every day. It provides access to the latest
              data available on COVID-19 new cases, death rate, test rate and
              other valuable data to gauge the transmission and response to the
              pandemic. Data are pooled from difference sources.
            </FooterTypography>
          </ResponsiveGridItem>
        </Grid>
      </Container>
    </BoxWithShadow>
  );
};

export default Footer;
