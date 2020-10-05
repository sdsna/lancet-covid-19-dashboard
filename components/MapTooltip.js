import { observer } from "mobx-react-lite";
import { Box, Popper, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useMapStore } from "helpers/mapStore";

const Tooltip = styled(Popper)`
  font-size: 0.8rem;
  border-radius: 4px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  position: absolute;
  pointer-events: none;
  z-index: 1000;

  .arrow:after {
    box-sizing: border-box;
    display: inline;
    font-size: 10px;
    width: 100%;
    line-height: 1;
    content: "▼";
    color: rgba(0, 0, 0, 0.8);
    position: absolute;
    text-align: center;
    left: 0;
    bottom: -7px;
  }
`;

const MapTooltip = observer(({ getLabel, getText, observations }) => {
  const mapStore = useMapStore();

  if (!mapStore.tooltip) return null;

  const countryId = mapStore.tooltip.countryId;
  const date = mapStore.activeDate;
  const anchor = mapStore.tooltip.anchor;

  return (
    <Tooltip
      open={true}
      anchorEl={anchor}
      placement="top"
      transition
      modifiers={{
        flip: {
          // our arrow is always pointing down, so do not flip tooltip
          enabled: false,
        },
        offset: {
          enabled: true,
          offset: "0, 10px",
        },
      }}
    >
      <Box paddingX={1} paddingY={0.5}>
        <Typography variant="body1" style={{ fontWeight: 700 }}>
          {getLabel(countryId)}
        </Typography>
        <Typography variant="body2">{getText({ countryId, date })}</Typography>
      </Box>
    </Tooltip>
  );
});

export default MapTooltip;
