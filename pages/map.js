import { useCallback, useEffect, useState } from "react";
import { scaleLinear } from "d3-scale";
import styled from "styled-components";

import MapLayout from "layouts/MapLayout";
import MapPane from "components/MapPane";
import MapTooltip from "components/MapTooltip";

import getIndicatorProps from "helpers/getIndicatorProps";

const Map = ({ countries, observations, indicator }) => {
  const [mapData, setMapData] = useState([]);

  const getTooltipLabel = useCallback((countryId) => countries[countryId], [
    countries,
  ]);

  const getTooltipText = useCallback(
    (countryId) =>
      mapData.find((dataPoint) => dataPoint.countryId === countryId)?.value,
    [mapData]
  );

  useEffect(() => {
    const { max, min } = indicator;

    const colorScale = scaleLinear()
      .domain([min, max])
      .range(["#bbe4fd", "#0084d5"])
      .clamp(true);

    const data = Object.keys(observations).map((id) => {
      const value = observations[id]["2020-09-10"];

      return {
        countryId: id,
        fill: colorScale(value),
        value,
      };
    });

    setMapData(data);
  }, [observations, indicator]);

  return (
    <MapLayout mobileMenuLabel="Settings">
      <MapPane data={mapData} />
      <MapTooltip
        getImage={() => {}}
        getLabel={getTooltipLabel}
        getText={getTooltipText}
      />
    </MapLayout>
  );
};

export async function getStaticProps() {
  const { countries, observations } = await getIndicatorProps("jhu_confirmed");

  // Evaluate max and min values for indicator
  // TODO: Calculate better bounds for color scale (perhaps based on 2.5th
  //       percentile)
  const values = [
    ...Object.values(observations).flatMap((dataPoints) => [
      ...Object.values(dataPoints),
    ]),
  ];
  const max = Math.max(...values);
  const min = Math.min(...values);

  return {
    props: {
      countries,
      observations,
      indicator: {
        max,
        min,
      },
    },
  };
}

export default Map;
