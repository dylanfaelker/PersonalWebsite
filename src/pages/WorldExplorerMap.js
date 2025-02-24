import React, { useState, useEffect } from 'react'
import { EquirectangleMap, CoordInterface } from '../components/worldExplorer'
import { useDispatch } from 'react-redux'
import { setTitle } from '../redux/slice/globalSlice'
import { Box, useTheme } from '@mui/material'

function WorldExplorerMap() {

  const dispatch = useDispatch()
  useEffect(() => {dispatch(setTitle("WORLD EXPLORER MAP"))})

  const theme = useTheme()

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const mapWidth = (windowWidth) => (windowWidth * 0.9)
  const mapHeight = (windowWidth) => (mapWidth(windowWidth) / 2)

  const handleResize = () => {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    if (mapHeight(windowWidth) < windowHeight * 0.8) {
      setWindowWidth(windowWidth)
    } else {
      setWindowWidth(windowHeight * 0.8 * 2)
    }
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
          height={mapHeight(windowWidth)}
          width={mapWidth(windowWidth)}
        />

        <Box sx={{ height: 100 }}></Box>
      
        <CoordInterface id={0} />

        <Box sx={{ height: 100 }}></Box>
    </Box>
  )
}

export default WorldExplorerMap