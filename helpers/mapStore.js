import React from "react";
import { useLocalStore } from "mobx-react-lite";

const storeContext = React.createContext(null);

export const MapStoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    activeDate: null,
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
    setActiveDate: (dateString) => {
      store.activeDate = dateString;

      // Construct URLSearchParams object instance from current URL querystring.
      var queryParams = new URLSearchParams(window.location.search);

      // Set new or modify existing parameter value.
      if (dateString === "latest") queryParams.delete("date");
      else queryParams.set("date", dateString);

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
  }));
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
