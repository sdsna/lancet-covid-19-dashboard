import FullScreenLayout from "layouts/FullScreenLayout";
import { MapStoreProvider } from "helpers/mapStore";

const MapLayout = ({
  children,
  startDate,
  endDate,
  Drawer,
  mobileMenuLabel,
}) => (
  <MapStoreProvider startDateString={startDate} endDateString={endDate}>
    <FullScreenLayout
      onContentResize={() => {
        window?.zoomAndPan?.resize();
        window?.zoomAndPan?.fit();
        window?.zoomAndPan?.center();
      }}
      mobileMenuLabel={mobileMenuLabel}
      drawerProps={{ permanent: true }}
      Drawer={Drawer}
    >
      {children}
    </FullScreenLayout>
  </MapStoreProvider>
);

export default MapLayout;
