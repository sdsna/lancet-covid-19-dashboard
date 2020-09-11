import { Box, Hidden } from "@material-ui/core";
import styled from "styled-components";
import AppLayout from "layouts/AppLayout";
import MobileMenuOpenerButton from "components/MobileMenuOpenerButton";

const FullScreen = styled(Box)`
  position: fixed;
  width: 100%;
  height: 100%;
`;

const FullScreenLayout = ({ mobileMenuLabel, ...props }) => (
  <FullScreen display="flex" flexDirection="column">
    <AppLayout overflow="hidden" fluid={true} footer={false} {...props} />
    {mobileMenuLabel ? (
      <Hidden implementation="css" smUp>
        <MobileMenuOpenerButton label={mobileMenuLabel} />
      </Hidden>
    ) : null}
  </FullScreen>
);

export default FullScreenLayout;
