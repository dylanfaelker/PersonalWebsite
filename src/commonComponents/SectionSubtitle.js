import { Typography, useTheme, useMediaQuery } from '@mui/material'
import React from 'react'

const SectionSubtitle = ({ children }) => {

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const isComputer = useMediaQuery(theme.breakpoints.up("lg"))

    return (
        <Typography 
            variant='h3' 
            sx={{
                fontSize: isComputer ? '64px' : isMobile ? '32px' : '48px',
                color: theme.palette.df.white
            }}
        >
            {children}
        </Typography>
    )
}

export default SectionSubtitle