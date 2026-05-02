import React from 'react'
import Timepoint from './Timepoint'
import { useTheme } from '@mui/material'
import { Box } from '@mui/material'

const Timeline = ({ points }) => {

    const theme = useTheme()

    return (
        <Box 
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box //timeline-start
                sx={{
                    position: 'relative',
                    height: '100px',
                    width: '36px',
                }}
            >
                <Box // line-start
                    sx={{
                        backgroundImage: `linear-gradient(${theme.palette.df.darkGreen}, ${theme.palette.df.maroon})`,
                        width: '7px',
                        height: '100px',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translate(-50%, 0)',
                        top: '3px',
                    }}
                ></Box>
            </Box>
            {points.map((point) => (
                <Timepoint
                    key={point.id} 
                    point={point}
                    length={points.length}
                />
            ))}
        </Box>
    )
}

export default Timeline