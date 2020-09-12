import { useCallback, useEffect, useState } from "react";
import { scaleLinear } from "d3-scale";
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
  const [mapData, setMapData] = useState([]);

  const getCountryName = useCallback((countryId) => countries[countryId], [
    countries,
  ]);

  const getCountryDate = useCallback(
    (countryId) => {
      const countryData = mapData.find((data) => data.countryId === countryId);
      return countryData?.date;
    },
    [mapData]
  );

  const getCountryValue = useCallback(
    (countryId) => {
      const countryData = mapData.find((data) => data.countryId === countryId);
      const value = countryData?.value;

      if (value) return Number(value).toLocaleString();

      return "No value";
    },
    [mapData]
  );

  const getApproximateCountryValue = useCallback(
    (countryId) => {
      const countryData = mapData.find((data) => data.countryId === countryId);
      const value = countryData?.value;

      if (value) return millify(value);

      return "No value";
    },
    [mapData]
  );

  useEffect(() => {
    const { max, min } = bounds;

    const colorScale = scaleLinear()
      .domain([min, max])
      .range(["#bbe4fd", "#0084d5"])
      .clamp(true);

    const data = Object.keys(observations).map((id) => {
      const latestDate = observations[id]["latestDate"];
      const value = parseFloat(observations[id][latestDate]);

      return {
        countryId: id,
        fill: colorScale(value),
        value,
        date: latestDate,
      };
    });

    setMapData(data);
  }, [observations, indicator, bounds]);

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
        />
      }
      mobileMenuLabel={indicator.id}
    >
      <MapPane data={mapData} />
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

  // Add latest date to each country
  Object.keys(observations).forEach((countryId) => {
    observations[countryId]["latestDate"] = Object.keys(observations[countryId])
      .sort()
      .pop();
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
      },
      indicators,
    },
  };
}

export default Map;
