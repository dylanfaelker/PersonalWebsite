import { Typography, useTheme, useMediaQuery } from '@mui/material'
import React from 'react'

const SectionTitle = ({ children }) => {

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const isComputer = useMediaQuery(theme.breakpoints.up("lg"))

    return (
        <Typography 
            variant='h2' 
            sx={{
                fontSize: isComputer ? '128px' : isMobile ? '64px' : '96px'
            }}
        >
            {children}
        </Typography>
    )
}

export default SectionTitle