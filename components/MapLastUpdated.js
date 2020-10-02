import { Box, Typography } from "@material-ui/core";
import { Update } from "mdi-material-ui";

const MapLastUpdated = ({ updatedAt }) => (
  <Box
    position="absolute"
    display="flex"
    padding={0.5}
    style={{ top: 0, right: 0, background: "rgba(255, 255, 255, 0.7)" }}
  >
    <Update fontSize="small" style={{ marginRight: 4 }} />
    <Typography variant="body1">Updated: {updatedAt}</Typography>
  </Box>
);

export default MapLastUpdated;
