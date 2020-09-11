import FullScreenAppLayout from 'layouts/FullScreenLayout'
import { MapStoreProvider } from 'helpers/mapStore'

const MapLayout = ({ children, Drawer, mobileMenuLabel }) => (
  <FullScreenAppLayout
    onContentResize={() => {
      window?.zoomAndPan?.resize()
      window?.zoomAndPan?.fit()
      window?.zoomAndPan?.center()
    }}
    mobileMenuLabel={mobileMenuLabel}
    drawerProps={{ permanent: true }}
    Drawer={Drawer}>
    <MapStoreProvider>
      {children}
    </MapStoreProvider>
  </FullScreenAppLayout>
)

export default MapLayout
