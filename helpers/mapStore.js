import React from "react";
import { useLocalStore } from "mobx-react-lite";
import { add, differenceInCalendarDays, format, parseISO } from "date-fns";

const storeContext = React.createContext(null);

export const MapStoreProvider = ({
  startDateString,
  endDateString,
  children,
}) => {
  const store = useLocalStore(
    (source) => ({
      currentStep: 0,
      player: null,
      get showTimeSlider() {
        return source.startDateString != null && source.endDateString != null;
      },
      get startDate() {
        return parseISO(source.startDateString);
      },
      get endDate() {
        return parseISO(source.endDateString);
      },
      get stepCount() {
        // Count days between the two dates
        const days = differenceInCalendarDays(store.endDate, store.startDate);

        // Add +1 for the "latest" option
        return days + 1;
      },
      get activeDateObject() {
        return add(store.startDate, { days: store.currentStep });
      },
      get activeDate() {
        if (store.isLastStep) return "latest";

        return format(store.activeDateObject, "y-MM-dd");
      },
      get isLastStep() {
        return store.currentStep >= store.stepCount;
      },
      get isPlaying() {
        return store.player !== null;
      },
      playOrPause() {
        if (store.isPlaying) store.pause();
        else store.play();
      },
      play() {
        // If we are currently at the end of the timeseries, let's go back to
        // the beginning
        if (store.isLastStep) store.selectStep(0, { skipUpdateUrl: true });

        // Start the slider
        store.player = setInterval(() => {
          store.stepForward({ skipUpdateUrl: true });

          if (store.isLastStep) store.pause();
        }, 1000 / 7);
      },
      pause() {
        clearInterval(store.player);
        store.player = null;
        store.updateDateInUrl();
      },
      stepForward(options) {
        if (store.setActiveDateString === "latest") return;

        store.selectStep(store.currentStep + 1, options);
      },
      selectStep(stepId, options) {
        if (stepId > store.stepCount) stepId = store.stepCount;
        if (stepId < 0) stepId = 0;

        store.currentStep = stepId;

        if (options?.skipUpdateUrl !== true) store.updateDateInUrl();
      },
      setActiveDateString(dateString) {
        if (dateString === "latest") return store.selectStep(store.stepCount);

        store.selectStep(
          differenceInCalendarDays(parseISO(dateString), store.startDate)
        );
      },
      tooltip: null,
      hideTooltip: () => {
        store.tooltip = null;
      },
      showTooltip: ({ countryId, event: { pageX: X, pageY: Y } }) => {
        const anchor = {
          getBoundingClientRect: () => ({
            top: Y,
            right: X,
            bottom: Y,
            left: X,
            width: 0,
            height: 0,
          }),
          clientWidth: 0,
          clientHeight: 0,
        };

        store.tooltip = { countryId, anchor };
      },
      updateDateInUrl: () => {
        // Construct URLSearchParams object instance from current URL querystring.
        var queryParams = new URLSearchParams(window.location.search);

        // Set new or modify existing parameter value.
        if (store.activeDate === "latest") queryParams.delete("date");
        else queryParams.set("date", store.activeDate);

        // Replace current querystring with the new one.
        const queryString = queryParams.toString();
        history.replaceState(
          null,
          null,
          queryString.length > 0
            ? `?${queryString}`
            : window.location.href.split("?")[0]
        );
      },
    }),
    { startDateString, endDateString }
  );
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useMapStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error("useMapStore must be used within a StoreProvider.");
  }
  return store;
};
