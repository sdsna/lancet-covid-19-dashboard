import FullScreenLayout from "layouts/FullScreenLayout";
import { MapStoreProvider } from "helpers/mapStore";

const MapLayout = ({ children, Drawer, mobileMenuLabel }) => (
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
    <MapStoreProvider>{children}</MapStoreProvider>
  </FullScreenLayout>
);

export default MapLayout;
