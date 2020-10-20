import { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  compareAsc,
  differenceInCalendarDays,
  format,
  parseISO,
} from "date-fns";
import styled from "styled-components";
import MapLayout from "layouts/MapLayout";
import MapDrawer from "components/MapDrawer";
import MapPane from "components/MapPane";
import MapTooltip from "components/MapTooltip";
import { mapIndicators } from "helpers/indicators";
import getIndicatorMapHref from "helpers/getIndicatorMapHref";
import getIndicatorProps from "helpers/getIndicatorProps";
import getColorScale from "helpers/getColorScale";
import formatIndicatorValue from "helpers/formatIndicatorValue";
import { useStore } from "helpers/uiStore";

const Map = observer(
  ({
    indicator,
    countries,
    observations,
    supplementalIndicators,
    bounds,
    isEmbedded,
  }) => {
    const getCountryName = useCallback((countryId) => countries[countryId], [
      countries,
    ]);

    const getCountryDate = useCallback(
      ({ countryId, date }) => {
        if (date === "latest")
          return `${observations[countryId]["latestDate"]} (latest value)`;

        return date;
      },
      [observations]
    );

    const getCountryObservations = useCallback(
      ({ countryId, date }) => {
        const values = observations[countryId][date] || [null];
        const indicators = [indicator, ...supplementalIndicators];

        return values.map((value, i) => ({
          label: indicators[i].name,
          value: formatIndicatorValue({
            value,
            indicator: indicators[i],
            approximate: true,
          }),
        }));
      },
      [observations]
    );

    const getTimeseries = useCallback(
      (countryId) => {
        const countryData = observations[countryId];
        return Object.keys(countryData)
          .map((key) => {
            if (key === "latestDate" || key === "latest") return;

            return {
              step: differenceInCalendarDays(
                parseISO(key),
                parseISO(bounds.startDate)
              ),
              [countryId]: countryData[key][0],
            };
          })
          .filter(Boolean);
      },
      [observations, bounds.startDate]
    );

    const getLink = (indicator) => {
      return getIndicatorMapHref(indicator, { embed: isEmbedded });
    };

    const uiStore = useStore();

    useEffect(() => {
      uiStore.setIsEmbedded(isEmbedded);
    }, [isEmbedded]);

    const colorScale = getColorScale(indicator.scale);

    return (
      <MapLayout
        title={indicator.name}
        Drawer={
          <MapDrawer
            indicator={indicator}
            indicators={mapIndicators}
            getCountryName={getCountryName}
            getCountryObservations={getCountryObservations}
            getCountryDate={getCountryDate}
            getTimeseries={getTimeseries}
            getLink={getLink}
          />
        }
        isEmbedded={isEmbedded}
        mobileMenuLabel={indicator.name}
        startDate={bounds.startDate}
        endDate={bounds.endDate}
      >
        <MapPane
          data={observations}
          colorScale={colorScale}
          startDate={bounds.startDate}
          endDate={bounds.endDate}
          extractedAt={indicator.extractedAt}
        />
        <MapTooltip
          getLabel={getCountryName}
          getCountryDate={getCountryDate}
          getObservations={getCountryObservations}
        />
      </MapLayout>
    );
  }
);

export async function getStaticPaths() {
  // Create one route for each indicator
  const paths = [];

  mapIndicators.forEach((indicator) => {
    // Support plain version
    paths.push({
      params: {
        slug: [indicator.slug],
      },
    });

    // Support embedded version
    paths.push({
      params: {
        slug: [indicator.slug, "embed"],
      },
    });
  });

  // Add one path without indicator ID
  paths.push({ params: { slug: [] } });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Flag for toggling embed mode
  let isEmbedded = false;
  if (params.slug && params.slug[params.slug.length - 1] === "embed") {
    isEmbedded = true;
  }

  // Load data for the requested indicator (or the first indicator in the list)
  const indicatorSlug =
    (params.slug && params.slug[0]) || mapIndicators[0].slug;
  const {
    indicator,
    countries,
    observations,
    supplementalIndicators,
  } = await getIndicatorProps(indicatorSlug);

  // Evaluate start and end Date
  const dateStrings = [
    ...new Set(
      Object.values(observations).flatMap((dataPoints) =>
        Object.keys(dataPoints)
      )
    ),
  ];
  const dates = dateStrings.map((string) => parseISO(string)).sort(compareAsc);

  // If startDate or endDate is set in helpers/indicators.js, use that date...
  let startDate = indicator.startDate;
  let endDate = indicator.endDate;
  // Otherwise, use the first and last date of data available
  // TODO: Remove data that exceeds the time bounds, so we can serve smaller
  //       data files.
  if (dates.length > 0 && startDate == null) {
    startDate = format(dates[0], "yyyy-MM-dd");
  }
  if (dates.length > 0 && endDate == null) {
    endDate = format(dates[dates.length - 1], "yyyy-MM-dd");
  }

  // Add latest date and latest value to each country
  Object.keys(observations).forEach((countryId) => {
    const latestDate = Object.keys(observations[countryId]).sort().pop();

    observations[countryId]["latest"] = observations[countryId][latestDate];
    observations[countryId]["latestDate"] = latestDate;
  });

  // Evaluate max and min values for indicator based on latest date
  // TODO: Calculate better bounds for color scale (perhaps based on 2.5th
  //       percentile)
  const values = Object.values(observations).map(
    (dataPoints) => dataPoints[dataPoints["latestDate"]]
  );
  const max = Math.max(...values);
  const min = Math.min(...values);

  return {
    props: {
      indicator,
      countries,
      observations,
      supplementalIndicators,
      bounds: {
        max,
        min,
        startDate,
        endDate,
      },
      isEmbedded,
    },
  };
}

export default Map;
