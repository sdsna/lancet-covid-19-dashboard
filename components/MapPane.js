import dynamic from 'next/dynamic'
import { Box } from '@material-ui/core'
import MapZoomControls from 'components/MapZoomControls'

const MapSvg = dynamic(() => import('components/MapSvg'), { ssr: false })

const startDrag = (event) => {
  event.currentTarget.style.cursor = 'grabbing'
}

const endDrag = (event) => {
  event.currentTarget.style.cursor = 'grab'
}

const MapPane = ({ countries }) => (
  <Box
    display='flex'
    flexGrow='1'
    position='relative'>
    <Box
      display='flex'
      flexGrow='1'
      style={{background: '#f8f8f8', cursor: 'grab'}}
      onMouseDown={startDrag}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}>
      <MapSvg
        countries={countries} />
    </Box>
    <MapZoomControls />
  </Box>
)

export default MapPane
