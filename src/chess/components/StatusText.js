import React from 'react'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material'

const StatusText = ({ children }) => {

  const theme = useTheme()

  return <Typography
            variant='h1'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '2vmin',
                fontSize: '4vmin',
                color: theme.palette.df.white,
            }}
        >{children}</Typography>
};

export default StatusText