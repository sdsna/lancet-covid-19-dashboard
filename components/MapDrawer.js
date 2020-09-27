import { observer, Observer } from "mobx-react-lite";
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
import { useMapStore } from "helpers/mapStore";

const TypographyWithEmphasis = styled(Typography)`
  && {
    font-weight: 500;
  }
`;

const CountryInfo = observer(
  ({ id, name, flagPath, getValue, getDate, timeseries, onClose }) => {
    const mapStore = useMapStore();

    return (
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
            <IconButton
              size="small"
              onClick={onClose}
              aria-label="close side menu"
            >
              <Close />
            </IconButton>
          </Box>
        </DrawerSection>
        <Divider />
        <DrawerSection gray>
          <Observer>
            {() => (
              <DrawerHeadingWithCaption
                caption={`as of ${getDate({
                  countryId: id,
                  date: mapStore.activeDate,
                })}`}
              >
                {getValue({ countryId: id, date: mapStore.activeDate })}
              </DrawerHeadingWithCaption>
            )}
          </Observer>
        </DrawerSection>
        <Divider />
        <IndicatorTimeseries
          chartData={timeseries}
          countryName={name}
          countryId={id}
          activeDate={mapStore.activeDate}
          // onClick={(data, index) => mapStore.setActiveDate(data.activeLabel)}
          gray
        />
      </>
    );
  }
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
            getValue={getCountryValue}
            getDate={getCountryDate}
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
