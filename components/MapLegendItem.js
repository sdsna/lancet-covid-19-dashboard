import { Box } from "@material-ui/core";
import styled from "styled-components";
import DrawerText from "components/DrawerText";

const ColorBlock = styled(Box).attrs((props) => ({
  marginRight: 1,
  style: {
    background: props.color,
  },
}))`
  width: 12px;
  min-width: 12px;
  max-width: 12px;
  height: 12px;
  min-height: 12px;
  max-height: 12px;
  border-radius: 100%;
`;

const MapLegendItem = ({ color, label }) => (
  <Box display="flex" alignItems="center">
    <ColorBlock marginRight={1} color={color} />
    <DrawerText>{label}</DrawerText>
  </Box>
);

export default MapLegendItem;
