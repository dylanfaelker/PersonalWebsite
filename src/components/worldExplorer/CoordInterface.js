import React, { useState, useEffect } from "react"
import { CoordInput, distanceEast, transposeLatitudeToMapBounds, transposeLongitudeToMapBounds } from '.'
import { Box, Checkbox, FormControlLabel, useTheme, useMediaQuery, Accordion, AccordionSummary, Typography, AccordionDetails, IconButton } from '@mui/material'
import { DoneAll, ExpandMore, Home, RemoveDone, ZoomOutMap } from '@mui/icons-material'
import Grid from '@mui/material/Grid2'
import { useDispatch, useSelector } from "react-redux"
import { addCountries, addOrUpdateCoord, deleteCountries } from '../../redux/slice/coordSlice'
import mapData from '../../assets/data/worldExplorer/mapData.json'
import CountryChecker from "./CountryChecker"

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
    const countries = useSelector((state) => state.coord.coordList.filter(coord => coord.id === id)[0].countries)
    
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
            countries: countries,
        }))
    }, [homeLatCoord, homeLongCoord, northCoord, southCoord, westCoord, eastCoord, hasCircumnav, id, dispatch, countries ])

    return (
        <>
            <Box display='flex' sx={{ alignItems: 'center' }}>
                <Home sx={{ color: theme.palette.df.lightGreen, height: 1 }}/>
                <Box sx={{ backgroundColor: theme.palette.df.lightGreen, width: '3px', height: '101px', marginX: '10px' }}></Box>
                <Box display='flex' sx={{ flexDirection: 'column' }}>
                    <CoordInput label={'Latitude'} coord={homeLatCoord} setCoord={(c) => setHomeLatCoord(transposeLatitudeToMapBounds(c))} error={homeLatCoord > 90 || homeLatCoord < -90} />
                    <Box sx={{ height: '5px' }}></Box>
                    <CoordInput label={'Longitude'} coord={homeLongCoord} setCoord={(c) => setHomeLongCoord(transposeLongitudeToMapBounds(c))} error={homeLongCoord > 180 || homeLongCoord < -180}/>
                </Box>
            </Box>

            <Box sx={{ height: 50 }}></Box>

            {isMobile ? 
            <>
                <Box display='flex' sx={{ alignItems: 'center' }}>
                    <ZoomOutMap sx={{ color: theme.palette.df.lightGreen, height: 1, transform: "rotate(45deg)" }} />
                    <Box sx={{ backgroundColor: theme.palette.df.lightGreen, width: '3px', height: '207px', marginX: '10px' }}></Box>
                    <Box display='flex' sx={{ flexDirection: 'column' }}>
                        <CoordInput label={"Furthest north"} coord={northCoord} setCoord={(c) => setNorthCoord(transposeLatitudeToMapBounds(c))} error={northCoord > 90 || northCoord < homeLatCoord} />
                        <Box sx={{ height: '5px' }}></Box>
                        <CoordInput label={"Furthest south"} coord={southCoord} setCoord={(c) => setSouthCoord(transposeLatitudeToMapBounds(c))} error={southCoord > homeLatCoord || southCoord < -90} />
                        <Box sx={{ height: '5px' }}></Box>
                        <CoordInput label={"Furthest west"} coord={westCoord} setCoord={(c) => setWestCoord(transposeLongitudeToMapBounds(c))} error={!hasCircumnav && distanceEast(homeLongCoord, westCoord) < distanceEast(homeLongCoord, eastCoord)} disable={hasCircumnav} />
                        <Box sx={{ height: '5px' }}></Box>
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

            <Box sx={{ height: 100 }}></Box>

            {['North America', 'South America', 'Europe', 'Africa', 'Asia', 'Oceania', 'Antarctica'].map((continent, index) => {
                const countriesInContinent = mapData.features.filter(feature => feature.properties.continent === continent)
                const countriesInContinentIds = countriesInContinent.map(feature => feature.id)
                return (
                    <Accordion disableGutters sx={{ width: '60vw' }} key={index}>
                        <AccordionSummary 
                            expandIcon={<ExpandMore sx={{ color: theme.palette.df.lightGreen }}/>}
                            sx={{
                                backgroundColor: theme.palette.df.grey,
                                color: theme.palette.df.white,
                            }}
                        >
                            <Box display='flex' sx={{ width: 1, justifyContent:'space-between', flexDirection: isMobile ? 'column' : 'row' }}>
                                <Typography>{continent} ({countriesInContinentIds.filter(country => countries.includes(country)).length})</Typography> 
                                <Box sx={{ marginRight: '20px' }}>
                                    <IconButton onClick={() => dispatch(addCountries({id: id, countries: countriesInContinentIds}))}>
                                        <DoneAll sx={{ color: theme.palette.df.lightGreen }}/>
                                    </IconButton>
                                    <IconButton onClick={() => dispatch(deleteCountries({id: id, countries: countriesInContinentIds}))}>
                                        <RemoveDone sx={{ color: theme.palette.df.lightGreen }}/>
                                    </IconButton>
                                </Box>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                backgroundColor: theme.palette.df.grey,
                                color: theme.palette.df.white,
                            }}
                        >
                            <Grid container columns={{ xs:3, sm:6, md:9, lg:12, }}>
                                {countriesInContinent.map((country, index) => (
                                    <Grid size={3} key={index}>
                                        <CountryChecker mapId={id} country={country}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                )
            })}

        </>
    )
}

export default CoordInterface;