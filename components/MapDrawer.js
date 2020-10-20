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
import MapPageSelectionButton from "components/MapPageSelectionButton";
import { useStore } from "helpers/uiStore";
import { useMapStore } from "helpers/mapStore";

const TypographyWithEmphasis = styled(Typography)`
  && {
    font-weight: 700;
  }
`;

const CountryInfo = observer(
  ({
    id,
    name,
    getObservations,
    getDate,
    scale,
    target,
    timeseries,
    onClose,
  }) => {
    const mapStore = useMapStore();
    const theme = useTheme();

    const [primaryObservation, ...supplementalObservations] = getObservations({
      countryId: id,
      date: mapStore.activeDate,
    });

    return (
      <>
        <DrawerSection gray>
          <Box display="flex" alignItems="center">
            <TypographyWithEmphasis
              variant="h3"
              component="p"
              style={{ fontWeight: 700, flexGrow: 1 }}
            >
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
          <Observer>
            {() => (
              <Typography variant="caption" color="textSecondary">
                as of{" "}
                {getDate({
                  countryId: id,
                  date: mapStore.activeDate,
                })}
              </Typography>
            )}
          </Observer>
          <Box marginTop={2}>
            <Observer>
              {() => (
                <>
                  <Typography
                    variant="overline"
                    style={{ color: "rgba(0,0,0,.7)" }}
                  >
                    {primaryObservation.label}
                  </Typography>
                  <Typography variant="body1" style={{ fontWeight: 500 }}>
                    {primaryObservation.value}
                  </Typography>
                </>
              )}
            </Observer>
          </Box>
        </DrawerSection>
        <IndicatorTimeseries
          chartData={timeseries}
          countryName={name}
          countryId={id}
          activeStep={mapStore.currentStep}
          scale={scale}
          target={target}
          primaryColor={theme.palette.secondary.main}
          secondaryColor={theme.palette.primary.main}
          // Do not include latest in timeseries chart
          steps={mapStore.stepCount - 1}
          stepFormatter={(stepId) =>
            format(mapStore.stepIdToDateObject(stepId), "PP")
          }
          onClick={(data, index) => mapStore.selectStep(data?.activeLabel)}
          gray
        />
        {supplementalObservations.length ? (
          <DrawerSection gray paddingTop={0} paddingBottom={0}>
            {supplementalObservations.map((observation, i) => (
              <Box key={observation.label} marginTop={i == 0 ? 0 : 2}>
                <Typography
                  variant="overline"
                  style={{ color: "rgba(0,0,0,.7)" }}
                >
                  {observation.label}
                </Typography>
                <Typography variant="body1" style={{ fontWeight: 500 }}>
                  {observation.value}
                </Typography>
              </Box>
            ))}
          </DrawerSection>
        ) : null}
      </>
    );
  }
);

const MapDrawer = observer(
  ({
    indicator,
    indicators,
    getCountryName,
    getCountryObservations,
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
            getObservations={getCountryObservations}
            getDate={getCountryDate}
            timeseries={getTimeseries(countryId)}
            scale={indicator.scale}
            target={indicator.target}
            onClose={() => uiStore.clearTarget()}
          />
        ) : (
          <MapLegend scale={indicator.scale} />
        )}
        <Divider />
        <IndicatorMetadata
          showActions={countryId == null}
          actionProps={{
            download: true,
            mapEmbed: !uiStore.isEmbedded,
            mapInNewTab: uiStore.isEmbedded,
          }}
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
