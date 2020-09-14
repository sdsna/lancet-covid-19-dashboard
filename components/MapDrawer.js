import { observer } from "mobx-react-lite";
import { Box, Divider, IconButton, Typography } from "@material-ui/core";
import { Close } from "mdi-material-ui";
import styled from "styled-components";
import DrawerSection from "components/DrawerSection";
import DrawerHeading from "components/DrawerHeading";
import DrawerHeadingWithCaption from "components/DrawerHeadingWithCaption";
import DrawerText from "components/DrawerText";
import MapLegend from "components/MapLegend";
import IndicatorHeading from "components/IndicatorHeading";
import IndicatorTimeseries from "components/IndicatorTimeseries";
import IndicatorMetadata from "components/IndicatorMetadata";
import MapPageSelectionButton from "components/MapPageSelectionButton";
import { useStore } from "helpers/uiStore";

const TypographyWithEmphasis = styled(Typography)`
  && {
    font-weight: 500;
  }
`;

const CountryInfo = ({
  id,
  name,
  flagPath,
  value,
  date,
  timeseries,
  onClose,
}) => (
  <>
    <DrawerSection gray>
      <Box display="flex" alignItems="center">
        <img
          alt={`Flag of ${name}`}
          style={{ height: 24, paddingRight: 8 }}
          src={flagPath}
        />
        <TypographyWithEmphasis variant="body1" style={{ flexGrow: 1 }}>
          {name}
        </TypographyWithEmphasis>
        <IconButton size="small" onClick={onClose} aria-label="close side menu">
          <Close />
        </IconButton>
      </Box>
    </DrawerSection>
    <Divider />
    <DrawerSection gray>
      <DrawerHeadingWithCaption caption={`as of ${date} (latest value)`}>
        {value}
      </DrawerHeadingWithCaption>
    </DrawerSection>
    <Divider />
    <IndicatorTimeseries
      chartData={timeseries}
      countryName={name}
      countryId={id}
      gray
    />
  </>
);

const MapDrawer = observer(
  ({
    indicator,
    indicators,
    getCountryName,
    getCountryFlagPath,
    getCountryValue,
    getCountryDate,
    getTimeseries,
  }) => {
    const uiStore = useStore();
    const countryId = uiStore.target;

    return (
      <>
        <MapPageSelectionButton indicators={indicators}>
          <IndicatorHeading indicator={indicator} />
        </MapPageSelectionButton>
        <Divider />
        {countryId ? (
          <CountryInfo
            id={countryId}
            name={getCountryName(countryId)}
            flagPath={getCountryFlagPath(countryId)}
            value={getCountryValue(countryId)}
            date={getCountryDate(countryId)}
            timeseries={getTimeseries(countryId)}
            onClose={() => uiStore.clearTarget()}
          />
        ) : (
          <MapLegend>... (to do)</MapLegend>
        )}
        <Divider />
        <IndicatorMetadata
          indicator={indicator}
          drawerSectionProps={{
            gray: countryId != null,
          }}
        />
      </>
    );
  }
);

export default MapDrawer;
