import MapLayout from "layouts/MapLayout";
import MapPane from "components/MapPane";
import MapTooltip from "components/MapTooltip";
import styled from "styled-components";

const Map = () => (
  <MapLayout mobileMenuLabel="Settings">
    <MapPane
      countries={[
        {
          id: "DEU",
          fill: "blue",
          disabled: false,
        },
      ]}
    />
    <MapTooltip getImage={() => {}} getLabel={() => {}} getText={() => {}} />
  </MapLayout>
);

export default Map;
