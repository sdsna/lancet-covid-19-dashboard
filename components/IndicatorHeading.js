import { Typography } from "@material-ui/core";
import styled from "styled-components";
import DrawerText from "components/DrawerText";

const TypographyWithEmphasis = styled(Typography)`
  && {
    font-weight: 500;
  }
`;

const IndicatorHeading = ({ indicator }) => (
  <>
    <Typography variant="overline" color="textSecondary">
      {indicator.source}
    </Typography>
    <TypographyWithEmphasis variant="body1">
      {indicator.id}
    </TypographyWithEmphasis>
  </>
);

export default IndicatorHeading;
