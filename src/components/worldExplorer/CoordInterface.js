import React, { useState, useEffect } from "react"
import { EquirectangleMap, CoordInput, distanceEast, transposeLatitudeToMapBounds, transposeLongitudeToMapBounds } from '.'
import { Box, Checkbox, FormControlLabel, useTheme, useMediaQuery } from '@mui/material'
import { Home, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp, ZoomOutMap } from '@mui/icons-material'
import Grid from '@mui/material/Grid2'
import { useDispatch } from "react-redux"
import { addOrUpdateCoord } from '../../redux/slice/coordSlice'

const CoordInterface = ({ id }) => {

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    
    const [homeLatCoord, setHomeLatCoord] = useState(43.65)
    const [homeLongCoord, setHomeLongCoord] = useState(-79.39)
    const [northCoord, setNorthCoord] = useState(64.33)
    const [southCoord, setSouthCoord] = useState(18.00)
    const [westCoord, setWestCoord] = useState(-156.69)
    const [eastCoord, setEastCoord] = useState(16.40)
    const [hasCircumnav, setHasCircumnav] = useState(false)
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(addOrUpdateCoord({
            id: id,
            homeCoord: {
                lat: homeLatCoord,
                long: homeLongCoord,
            },
            boundaryCoords: {
                north: northCoord,
                south: southCoord,
                west: westCoord,
                east: eastCoord,
            },
            hasCircumnav: hasCircumnav,
        }))
    }, [homeLatCoord, homeLongCoord, northCoord, southCoord, westCoord, eastCoord, hasCircumnav, ])

    return (
        <>
            <Box display='flex' sx={{ alignItems: 'center' }}>
                <Home sx={{ color: theme.palette.df.lightGreen, height: 1 }}/>
                <Box sx={{ backgroundColor: theme.palette.df.lightGreen, width: '3px', height: '96px', marginX: '10px' }}></Box>
                <Box display='flex' sx={{ flexDirection: 'column' }}>
                    <CoordInput label={'Latitude'} coord={homeLatCoord} setCoord={(c) => setHomeLatCoord(transposeLatitudeToMapBounds(c))} error={homeLatCoord > 90 || homeLatCoord < -90} />
                    <CoordInput label={'Longitude'} coord={homeLongCoord} setCoord={(c) => setHomeLongCoord(transposeLongitudeToMapBounds(c))} error={homeLongCoord > 180 || homeLongCoord < -180}/>
                </Box>
            </Box>

            <Box sx={{ height: 50 }}></Box>

            {isMobile ? 
            <>
                <Box display='flex' sx={{ alignItems: 'center' }}>
                    <ZoomOutMap sx={{ color: theme.palette.df.lightGreen, height: 1, transform: "rotate(45deg)" }} />
                    <Box sx={{ backgroundColor: theme.palette.df.lightGreen, width: '3px', height: '192px', marginX: '10px' }}></Box>
                    <Box display='flex' sx={{ flexDirection: 'column' }}>
                        <CoordInput label={"Furthest north"} coord={northCoord} setCoord={(c) => setNorthCoord(transposeLatitudeToMapBounds(c))} error={northCoord > 90 || northCoord < homeLatCoord} />
                        <CoordInput label={"Furthest south"} coord={southCoord} setCoord={(c) => setSouthCoord(transposeLatitudeToMapBounds(c))} error={southCoord > homeLatCoord || southCoord < -90} />
                        <CoordInput label={"Furthest west"} coord={westCoord} setCoord={(c) => setWestCoord(transposeLongitudeToMapBounds(c))} error={!hasCircumnav && distanceEast(homeLongCoord, westCoord) < distanceEast(homeLongCoord, eastCoord)} disable={hasCircumnav} />
                        <CoordInput label={"Furthest east"} coord={eastCoord} setCoord={(c) => setEastCoord(transposeLongitudeToMapBounds(c))} error={!hasCircumnav && distanceEast(homeLongCoord, westCoord) < distanceEast(homeLongCoord, eastCoord)} disable={hasCircumnav} />
                    </Box>
                </Box>
            </> : <>
                <Grid container spacing={1} sx={{ maxWidth: '80%' }}>
                    <Grid size={12} display='flex' sx={{ justifyContent: 'center' }}>
                        <CoordInput label={"Furthest north"} coord={northCoord} setCoord={(c) => setNorthCoord(transposeLatitudeToMapBounds(c))} error={northCoord > 90 || northCoord < homeLatCoord} />
                    </Grid>
                    <Grid size={5} display='flex' sx={{ justifyContent: 'center' }}>
                        <CoordInput label={"Furthest west"} coord={westCoord} setCoord={(c) => setWestCoord(transposeLongitudeToMapBounds(c))} error={!hasCircumnav && distanceEast(homeLongCoord, westCoord) < distanceEast(homeLongCoord, eastCoord)} disable={hasCircumnav} />
                    </Grid>
                    <Grid size={2} display='flex' sx={{ justifyContent: 'center' }}>
                        <ZoomOutMap sx={{ color: theme.palette.df.lightGreen, height: 1, transform: "rotate(45deg)" }} />
                    </Grid>
                    <Grid size={5} display='flex' sx={{ justifyContent: 'center' }}>
                        <CoordInput label={"Furthest east"} coord={eastCoord} setCoord={(c) => setEastCoord(transposeLongitudeToMapBounds(c))} error={!hasCircumnav && distanceEast(homeLongCoord, westCoord) < distanceEast(homeLongCoord, eastCoord)} disable={hasCircumnav} />
                    </Grid>
                    <Grid size={12} display='flex' sx={{ justifyContent: 'center' }}>
                        <CoordInput label={"Furthest south"} coord={southCoord} setCoord={(c) => setSouthCoord(transposeLatitudeToMapBounds(c))} error={southCoord > homeLatCoord || southCoord < -90} />
                    </Grid>
                </Grid>
            </>}
            
            <Box sx={{ height: 50 }}></Box>
            
            <FormControlLabel
                sx={{ color: '#F6F4F4', maxWidth: '80%' }}
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
        </>
    )
}

export default CoordInterface;