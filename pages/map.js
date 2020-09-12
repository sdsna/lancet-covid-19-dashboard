import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import MapLayout from "layouts/MapLayout";
import MapPane from "components/MapPane";
import MapTooltip from "components/MapTooltip";

import getIndicatorProps from "helpers/getIndicatorProps";

const Map = ({ countries, observations }) => {
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
    const data = Object.keys(observations).map((id) => {
      return {
        countryId: id,
        fill: "blue",
        value: observations[id]["2020-09-10"],
      };
    });

    setMapData(data);
  }, [observations]);

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

  return {
    props: {
      countries,
      observations,
    },
  };
}

export default Map;
