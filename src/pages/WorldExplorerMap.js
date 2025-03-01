import React, { useState, useEffect } from 'react'
import { EquirectangleMap, CoordInterface } from '../components/worldExplorer'
import { useDispatch } from 'react-redux'
import { setTitle } from '../redux/slice/globalSlice'
import { Box, Typography, useTheme } from '@mui/material'

function WorldExplorerMap() {

  const dispatch = useDispatch()
  useEffect(() => {dispatch(setTitle("WORLD EXPLORER MAP"))})

  const theme = useTheme()

  const mapWidth = (windowWidth, windowHeight) => {
    if (windowWidth * 0.9 / 2 < windowHeight * 0.8) {
      return windowWidth * 0.9
    } else {
      return windowHeight * 0.8 * 2
    }
  }
  const mapHeight = (windowWidth, windowHeight) => (mapWidth(windowWidth, windowHeight) / 2)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <Box display='flex' sx={{ flexDirection: 'column', alignItems: 'center', backgroundColor: theme.palette.df.darkGreen, minHeight: '100vh' }}>

        <Box sx={{ height: 100 }}></Box>

        <EquirectangleMap 
          height={mapHeight(windowWidth, windowHeight)}
          width={mapWidth(windowWidth, windowHeight)}
        />
        <Typography sx={{ fontSize: '8px' }}>* No political statements are being made with regards to borders and countries. This map data is not mine.</Typography>

        <Box sx={{ height: 100 }}></Box>
      
        <CoordInterface id={0} />

        <Box sx={{ height: 100 }}></Box>
    </Box>
  )
}

export default WorldExplorerMap