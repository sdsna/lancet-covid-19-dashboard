import { useCallback, useEffect, useState } from "react";
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
import INDICATORS from "helpers/indicators";
import getIndicatorProps from "helpers/getIndicatorProps";
import getColorScale from "helpers/getColorScale";

const Map = ({
  indicator,
  countries,
  observations,
  bounds,
  indicators,
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

  const getCountryValue = useCallback(
    ({ countryId, date }) => {
      const value = observations[countryId][date];

      if (value != null) {
        const { scale } = indicator;

        if (scale.type === "threshold") return Number(value).toLocaleString();
        if (scale.type === "ordinal")
          return scale.categories.find((c) => c.value === value).label;
      }

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

      if (value != null) {
        const { scale } = indicator;

        if (scale.type === "threshold") return millify(value);
        if (scale.type === "ordinal")
          return scale.categories.find((c) => c.value === value).label;
      }

      return "No value";
    },
    [observations]
  );

  const getLink = (indicator) => {
    let path = `/${indicator.slug}`;

    // If in embed mode, add embed
    if (isEmbedded) path += "/embed";

    return path;
  };

  const colorScale = getColorScale(indicator.scale);

  return (
    <MapLayout
      Drawer={
        <MapDrawer
          indicator={indicator}
          indicators={indicators}
          getCountryName={getCountryName}
          getCountryValue={getCountryValue}
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
        getText={getApproximateCountryValue}
      />
    </MapLayout>
  );
};

export async function getStaticPaths() {
  // Create one route for each indicator
  const paths = [];

  INDICATORS.forEach((indicator) => {
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
  // paths.push({ params: { slug: [] } });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch list of indicators, keeping only slug, id, and name
  const indicators = INDICATORS.map(({ slug, id, name }) => ({
    slug,
    id,
    name,
  }));

  // Flag for toggling embed mode
  let isEmbedded = false;
  if (params.slug && params.slug[params.slug.length - 1] === "embed") {
    isEmbedded = true;
  }

  // Load data for the requested indicator (or the first indicator in the list)
  const indicatorSlug = (params.slug && params.slug[0]) || indicators[0].slug;
  const { indicator, countries, observations } = await getIndicatorProps(
    indicatorSlug
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
      isEmbedded,
    },
  };
}

export default Map;
