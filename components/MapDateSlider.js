import { useCallback, useEffect } from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import { useRouter } from "next/router";
import { Box, ButtonBase, Divider, Slider, Tooltip } from "@material-ui/core";
import { Pause, Play } from "mdi-material-ui";
import Link from "next/link";
import { format } from "date-fns";
import { useMapStore } from "helpers/mapStore";

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={value}
      // Position below the drawer
      PopperProps={{ style: { zIndex: 1000 } }}
    >
      {children}
    </Tooltip>
  );
}

const MapDateSlider = observer((props) => {
  const router = useRouter();
  const mapStore = useMapStore();

  const getHumanDate = useCallback(() => {
    if (mapStore.activeDate === "latest") return "Latest";

    return format(mapStore.activeDateObject, "PP");
  }, [mapStore]);

  useEffect(() => {
    if (!mapStore.showTimeSlider) return;

    mapStore.setActiveDateString(router.query.date || "latest");
  }, [router]);

  // Do not display slider if dates are not set (we probably have no
  // observations)
  if (!mapStore.showTimeSlider) return <Box flexGrow={1} />;

  return (
    <Box
      marginLeft={2}
      marginRight={2}
      marginBottom={1}
      boxShadow={3}
      display="flex"
      alignSelf="flex-end"
      flexGrow={1}
      style={{ borderRadius: 8, background: "white" }}
    >
      <ButtonBase
        variant="outlined"
        style={{
          padding: 4,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        onClick={mapStore.playOrPause}
      >
        {mapStore.isPlaying ? (
          <Pause fontSize="small" />
        ) : (
          <Play fontSize="small" />
        )}
      </ButtonBase>
      <Divider orientation="vertical" flexItem />
      <Box display="flex" flexGrow={1} paddingX={2}>
        <Slider
          value={mapStore.currentStep}
          min={0}
          step={1}
          max={mapStore.stepCount}
          ValueLabelComponent={ValueLabelComponent}
          valueLabelFormat={getHumanDate}
          onChange={(_event, value) =>
            mapStore.selectStep(value, { skipUpdateUrl: true })
          }
          onChangeCommitted={(_event, value) => mapStore.selectStep(value)}
          valueLabelDisplay={mapStore.isPlaying ? "on" : "auto"}
        />
      </Box>
    </Box>
  );
});

export default MapDateSlider;
