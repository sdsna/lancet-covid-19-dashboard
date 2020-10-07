import { observer, Observer } from "mobx-react-lite";
import { Box, Divider, IconButton, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Close } from "mdi-material-ui";
import styled from "styled-components";
import { format } from "date-fns";
import DrawerSection from "components/DrawerSection";
import DrawerHeading from "components/DrawerHeading";
import DrawerHeadingWithCaption from "components/DrawerHeadingWithCaption";
import DrawerText from "components/DrawerText";
import MapLegend from "components/MapLegend";
import IndicatorHeading from "components/IndicatorHeading";
import IndicatorTimeseries from "components/IndicatorTimeseries";
import IndicatorMetadata from "components/IndicatorMetadata";
import { useStore } from "helpers/uiStore";

const TypographyWithEmphasis = styled(Typography)`
  && {
    font-weight: 700;
  }
`;

const IndicatorDrawer = observer(({ getIndicatorById }) => {
  const uiStore = useStore();
  const indicatorId = uiStore.target;

  return (
    <>
      <DrawerSection gray>
        <Box display="flex" alignItems="center">
          <Typography variant="h4" style={{ flexGrow: 1 }}>
            Indicator Details
          </Typography>
          <IconButton
            size="small"
            onClick={() => uiStore.closeDrawer()}
            aria-label="close side menu"
          >
            <Close />
          </IconButton>
        </Box>
      </DrawerSection>
      <Divider />
      <IndicatorMetadata
        showDatabaseId={true}
        actionProps={{
          map: true,
          download: true,
          source: true,
        }}
        indicator={getIndicatorById(indicatorId)}
      />
    </>
  );
});

export default IndicatorDrawer;
