import { observer, Observer } from "mobx-react-lite";
import { Box, Divider, IconButton, Typography } from "@material-ui/core";
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
import MapPageSelectionButton from "components/MapPageSelectionButton";
import { useStore } from "helpers/uiStore";
import { useMapStore } from "helpers/mapStore";

const TypographyWithEmphasis = styled(Typography)`
  && {
    font-weight: 500;
  }
`;

const CountryInfo = observer(
  ({ id, name, flagPath, getValue, getDate, scale, timeseries, onClose }) => {
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
          activeStep={mapStore.currentStep}
          scale={scale}
          // Do not include latest in timeseries chart
          steps={mapStore.stepCount - 1}
          stepFormatter={(stepId) =>
            format(mapStore.stepIdToDateObject(stepId), "PP")
          }
          onClick={(data, index) => mapStore.selectStep(data.activeLabel)}
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
    getLink,
  }) => {
    const uiStore = useStore();
    const mapStore = useMapStore();
    const countryId = uiStore.target;

    return (
      <>
        <MapPageSelectionButton indicators={indicators} getLink={getLink}>
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
            scale={indicator.scale}
            onClose={() => uiStore.clearTarget()}
          />
        ) : (
          <MapLegend scale={indicator.scale} />
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
