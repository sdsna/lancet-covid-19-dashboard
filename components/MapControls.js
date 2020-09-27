import { Box, ButtonBase, Divider, Hidden } from "@material-ui/core";
import { Plus, ArrowExpandAll, Minus } from "mdi-material-ui";
import Link from "next/link";
import styled from "styled-components";
import MapFooter from "components/MapFooter";

const MapControls = ({ children }) => (
  <Box position="absolute" style={{ bottom: 0, left: 0, right: 0 }}>
    {children}
  </Box>
);

export default MapControls;
