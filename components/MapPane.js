import dynamic from "next/dynamic";
import { Box, Hidden } from "@material-ui/core";
import MapLastUpdated from "components/MapLastUpdated";
import MapControls from "components/MapControls";
import MapDateSlider from "components/MapDateSlider";
import MapZoomControls from "components/MapZoomControls";
import MapFooter from "components/MapFooter";

const MapSvg = dynamic(() => import("components/MapSvg"), { ssr: false });

const startDrag = (event) => {
  event.currentTarget.style.cursor = "grabbing";
};

const endDrag = (event) => {
  event.currentTarget.style.cursor = "grab";
};

const MapPane = ({ data, extractedAt, colorScale, startDate, endDate }) => (
  <Box display="flex" flexGrow="1" position="relative">
    <Box
      display="flex"
      flexGrow="1"
      style={{ background: "#f8f8f8", cursor: "grab" }}
      onMouseDown={startDrag}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onContextMenu={(event) => {
        event.preventDefault();
        return false;
      }}
    >
      <MapSvg data={data} colorScale={colorScale} />
    </Box>
    <MapLastUpdated updatedAt={extractedAt} />
    <MapControls>
      <Box display="flex">
        <MapDateSlider startDateString={startDate} endDateString={endDate} />
        <MapZoomControls />
      </Box>
      <Hidden implementation="css" only="xs">
        <MapFooter />
      </Hidden>
    </MapControls>
  </Box>
);

export default MapPane;
