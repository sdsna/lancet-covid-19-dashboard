import { Box, ButtonBase, Divider } from "@material-ui/core";
import { Plus, ArrowExpandAll, Minus } from "mdi-material-ui";
import Link from "next/link";
import styled from "styled-components";

const MapZoomControls = () => (
  <Box
    display="flex"
    flexDirection="row-reverse"
    alignItems="flex-end"
    justifyContent="space-between"
  >
    <Box
      marginRight={2}
      marginBottom={1}
      boxShadow={3}
      display="flex"
      flexDirection="column"
      style={{ borderRadius: 8, background: "white" }}
    >
      <ButtonBase
        variant="outlined"
        style={{
          padding: 4,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        onClick={() => window.zoomAndPan?.zoomIn()}
      >
        <Plus fontSize="small" />
      </ButtonBase>
      <Divider />
      <ButtonBase
        variant="outlined"
        style={{ padding: 4 }}
        onClick={() => {
          window.zoomAndPan?.fit();
          window.zoomAndPan?.center();
        }}
      >
        <ArrowExpandAll fontSize="small" />
      </ButtonBase>
      <Divider />
      <ButtonBase
        variant="outlined"
        style={{
          padding: 4,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
        onClick={() => window.zoomAndPan?.zoomOut()}
      >
        <Minus fontSize="small" />
      </ButtonBase>
    </Box>
  </Box>
);

export default MapZoomControls;
