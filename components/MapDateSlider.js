import { useEffect, useRef, useState } from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import { useRouter } from "next/router";
import { Box, ButtonBase, Divider, Slider, Tooltip } from "@material-ui/core";
import { Pause, Play } from "mdi-material-ui";
import Link from "next/link";
import { add, differenceInCalendarDays, format, parseISO } from "date-fns";
import styled from "styled-components";
import { useMapStore } from "helpers/mapStore";

const StyledSlider = styled(Slider)`
  && {
    color: #0267d2;
  }
`;

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

  const sliderStore = useLocalStore(
    (source) => ({
      currentStep: 0,
      player: null,
      get startDate() {
        return parseISO(source.startDateString);
      },
      get endDate() {
        return parseISO(source.endDateString);
      },
      get stepCount() {
        // Count days between the two dates
        const days = differenceInCalendarDays(
          sliderStore.endDate,
          sliderStore.startDate
        );

        // Add +1 for the "latest" option
        return days + 1;
      },
      get activeDate() {
        return add(sliderStore.startDate, { days: sliderStore.currentStep });
      },
      get activeDateString() {
        if (sliderStore.isLastStep) return "latest";

        return format(sliderStore.activeDate, "y-MM-dd");
      },
      get activeDateHuman() {
        if (sliderStore.isLastStep) return "Latest";

        return format(sliderStore.activeDate, "PP");
      },
      get isLastStep() {
        return sliderStore.currentStep >= sliderStore.stepCount;
      },
      get isPlaying() {
        return sliderStore.player !== null;
      },
      playOrPause() {
        if (sliderStore.isPlaying) sliderStore.pause();
        else sliderStore.play();
      },
      play() {
        // If we are currently at the end of the timeseries, let's go back to
        // the beginning
        if (sliderStore.isLastStep) sliderStore.selectStep(0);

        // Start the slider
        sliderStore.player = setInterval(() => {
          sliderStore.stepForward();

          if (sliderStore.isLastStep) sliderStore.pause();
        }, 1000 / 7);
      },
      pause() {
        clearInterval(sliderStore.player);
        sliderStore.player = null;
      },
      stepForward() {
        if (sliderStore.setActiveDateString === "latest") return;

        sliderStore.selectStep(sliderStore.currentStep + 1);
      },
      selectStep(stepId) {
        sliderStore.currentStep = stepId;

        // Set new date in the mapStore
        mapStore.setActiveDate(sliderStore.activeDateString);
      },
      setActiveDateString(dateString) {
        if (dateString === "latest")
          return sliderStore.selectStep(sliderStore.stepCount);

        sliderStore.selectStep(
          differenceInCalendarDays(parseISO(dateString), sliderStore.startDate)
        );
      },
    }),
    props
  );

  useEffect(() => {
    if (props.startDateString === null || props.endDateString === null) return;

    sliderStore.setActiveDateString(router.query.date || "latest");
  }, [router]);

  // Do not display slider if dates are not set (we probably have no
  // observations)
  if (props.startDateString === null || props.endDateString === null)
    return <Box flexGrow={1} />;

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
        onClick={sliderStore.playOrPause}
      >
        {sliderStore.isPlaying ? (
          <Pause fontSize="small" />
        ) : (
          <Play fontSize="small" />
        )}
      </ButtonBase>
      <Divider orientation="vertical" flexItem />
      <Box display="flex" flexGrow={1} paddingX={2}>
        <StyledSlider
          value={sliderStore.currentStep}
          min={0}
          step={1}
          max={sliderStore.stepCount}
          ValueLabelComponent={ValueLabelComponent}
          valueLabelFormat={() => sliderStore.activeDateHuman}
          onChange={(_event, value) => sliderStore.selectStep(value)}
          valueLabelDisplay={sliderStore.isPlaying ? "on" : "auto"}
        />
      </Box>
    </Box>
  );
});

export default MapDateSlider;
