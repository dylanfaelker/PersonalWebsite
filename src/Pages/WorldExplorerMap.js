import React, { useState } from 'react'
import { Navbar } from '../components/common'
import { EquirectangleMap, CoordInput, distanceEast, transposeLatitudeToMapBounds, transposeLongitudeToMapBounds } from '../components/worldExplorer'
import { Checkbox, FormControlLabel } from '@mui/material'
import Grid from '@mui/material/Grid2';

function WorldExplorerMap() {

  const [homeLatCoord, setHomeLatCoord] = useState(43.65)
  const [homeLongCoord, setHomeLongCoord] = useState(-79.39)
  const [northCoord, setNorthCoord] = useState(64.33)
  const [southCoord, setSouthCoord] = useState(18.00)
  const [westCoord, setWestCoord] = useState(-156.69)
  const [eastCoord, setEastCoord] = useState(16.40)
  const [hasCircumnav, setHasCircumnav] = useState(false)

  return (
    <div class="page">
      <Navbar/>
      <div class='main'>
        <div class="section"></div>
        <div class="section">
          <EquirectangleMap 
            height={400} width={800} 
            homeCoord={[homeLatCoord, homeLongCoord]} 
            boundaryCoords={{north: northCoord, south: southCoord, east: eastCoord, west: westCoord}}
            hasCircumnav={hasCircumnav}
          />
        </div>
        <div class="section">
          <Grid container spacing={2}>
            <Grid size={6} >
              <CoordInput label={'Home Latitude'} coord={homeLatCoord} setCoord={(c) => setHomeLatCoord(transposeLatitudeToMapBounds(c))} error={homeLatCoord > 90 || homeLatCoord < -90} />
            </Grid>
            <Grid size={6}>
              <CoordInput label={'Home Longitude'} coord={homeLongCoord} setCoord={(c) => setHomeLongCoord(transposeLongitudeToMapBounds(c))} error={homeLongCoord > 180 || homeLongCoord < -180}/>
            </Grid>
          </Grid>
        </div>
        <div class="section">  
          <CoordInput label={"Highest northern latitude"} coord={northCoord} setCoord={(c) => setNorthCoord(transposeLatitudeToMapBounds(c))} error={northCoord > 90 || northCoord < homeLatCoord} />
          <Grid container spacing={2}>
            <Grid size={6}>
              <CoordInput label={"Furthest western longitude"} coord={westCoord} setCoord={(c) => setWestCoord(transposeLongitudeToMapBounds(c))} error={!hasCircumnav && distanceEast(homeLongCoord, westCoord) < distanceEast(homeLongCoord, eastCoord)} disable={hasCircumnav} />
            </Grid>
            <Grid size={6}>
            <CoordInput label={"Furthest eastern longitude"} coord={eastCoord} setCoord={(c) => setEastCoord(transposeLongitudeToMapBounds(c))} error={!hasCircumnav && distanceEast(homeLongCoord, westCoord) < distanceEast(homeLongCoord, eastCoord)} disable={hasCircumnav} />
            </Grid>
          </Grid>
          <CoordInput label={"Lowest southern latitude"} coord={southCoord} setCoord={(c) => setSouthCoord(transposeLatitudeToMapBounds(c))} error={southCoord > homeLatCoord || southCoord < -90} />
          <FormControlLabel
            sx={{ color: '#F6F4F4', }}
            control={
              <Checkbox
                value={hasCircumnav}
                onChange={(event) => {
                  setHasCircumnav(event.target.checked)
                }}
                sx={{
                  color: '#F6F4F4',
                  '&.Mui-checked': {
                    color: '#F6F4F4',
                  },
                }}
              />
            } 
            label="Have you circumnavigated the globe?"
          />
        </div>
      </div>  
    </div>
  )
}

export default WorldExplorerMap