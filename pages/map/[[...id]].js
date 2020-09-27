import { useCallback, useEffect, useState } from "react";
import { scaleLinear } from "d3-scale";
import {
  compareAsc,
  differenceInCalendarDays,
  format,
  parseISO,
} from "date-fns";
import styled from "styled-components";
import millify from "millify";
import MapLayout from "layouts/MapLayout";
import MapDrawer from "components/MapDrawer";
import MapPane from "components/MapPane";
import MapTooltip from "components/MapTooltip";
import getIndicators from "helpers/getIndicators";
import getIndicatorProps from "helpers/getIndicatorProps";
import getCountryFlagPath from "helpers/getCountryFlagPath";

const Map = ({ indicator, countries, observations, bounds, indicators }) => {
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

  const getCountryValue = useCallback(
    ({ countryId, date }) => {
      const value = observations[countryId][date];

      if (value != null) return Number(value).toLocaleString();

      return "No value";
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
            [countryId]: countryData[key],
          };
        })
        .filter(Boolean);
    },
    [observations, bounds.startDate]
  );

  const getApproximateCountryValue = useCallback(
    ({ countryId, date }) => {
      const value = observations[countryId][date];

      if (value != null) return millify(value);

      return "No value";
    },
    [observations]
  );

  const colorScale = scaleLinear()
    .domain([bounds.min, bounds.max])
    .range(["#bbe4fd", "#0084d5"])
    .clamp(true);

  return (
    <MapLayout
      Drawer={
        <MapDrawer
          indicator={indicator}
          indicators={indicators}
          getCountryFlagPath={getCountryFlagPath}
          getCountryName={getCountryName}
          getCountryValue={getCountryValue}
          getCountryDate={getCountryDate}
          getTimeseries={getTimeseries}
        />
      }
      mobileMenuLabel={indicator.id}
      startDate={bounds.startDate}
      endDate={bounds.endDate}
    >
      <MapPane
        data={observations}
        colorScale={colorScale}
        startDate={bounds.startDate}
        endDate={bounds.endDate}
      />
      <MapTooltip
        getImage={getCountryFlagPath}
        getLabel={getCountryName}
        getText={getApproximateCountryValue}
      />
    </MapLayout>
  );
};

export async function getStaticPaths() {
  // Fetch list of indicators
  const indicators = await getIndicators();

  const paths = indicators.map((indicator) => ({
    params: {
      id: [indicator.id],
    },
  }));

  // Add one path without indicator ID
  paths.push({ params: { id: [] } });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch list of indicators
  const indicators = await getIndicators();

  // Load data for the requested indicator (or the first indicator in the list)
  const indicatorId = (params.id && params.id[0]) || indicators[0].id;
  const { indicator, countries, observations } = await getIndicatorProps(
    indicatorId
  );

  // Evaluate start and end Date
  const dateStrings = [
    ...new Set(
      Object.values(observations).flatMap((dataPoints) =>
        Object.keys(dataPoints)
      )
    ),
  ];
  const dates = dateStrings.map((string) => parseISO(string)).sort(compareAsc);
  let startDate = null,
    endDate = null;
  if (dates.length > 0) {
    startDate = format(dates[0], "yyyy-MM-dd");
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
      bounds: {
        max,
        min,
        startDate,
        endDate,
      },
      indicators,
    },
  };
}

export default Map;
