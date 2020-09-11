import React from "react";
import { useLocalStore } from "mobx-react-lite";

const storeContext = React.createContext(null);

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    target: null,
    showDrawer: false,
    openDrawer(target) {
      store.showDrawer = true;
      store.target = target;
    },
    closeDrawer() {
      store.showDrawer = false;
    },
    clearTarget() {
      store.target = null;
    },
  }));
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
