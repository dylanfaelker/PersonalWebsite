import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { AppBar, Box, IconButton, Popover, Typography, Grid2 } from '@mui/material'
import { useTheme, useMediaQuery } from '@mui/material'
import { DescriptionOutlined, EmailOutlined, GitHub, LinkedIn, Menu } from '@mui/icons-material'
import ResumePDF from '../../assets/pdfs/Resume.pdf'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const [anchorEl, setAnchorEl] = useState(null)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const pageTitle = useSelector((state) => state.global.title)

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const isComputer = useMediaQuery(theme.breakpoints.up("lg"))

    return (
        <AppBar 
            position='fixed'
            elevation={0}
        >
            <Box 
                display='flex'
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 50,
                    backgroundColor: theme.palette.df.grey,
                }}
            >
                <Grid2 container sx={{ justifyContent: 'space-between', alignItems: 'center', marginX:'2vw', width: '100%' }}>
                    <Grid2 size={2} >
                        <Box display='flex' sx={{ justifyContent: 'start' }}>
                            <Link to="/">
                                <Typography variant='h4' sx={{ color: theme.palette.df.white, }}>DF</Typography>
                            </Link>
                        </Box>
                    </Grid2>
                        {isComputer && <Typography variant='h4' sx={{ color: theme.palette.df.white }}>{pageTitle}</Typography>}
                    <Grid2 size={2}>
                        <Box display='flex' sx={{ justifyContent: 'end' }}>
                            {isMobile ?
                            <>
                                <IconButton onClick={handleClick}>
                                    <Menu sx={{ color: theme.palette.df.lightGreen, height: 35, width: 35 }}/>
                                </IconButton>
                                <Popover 
                                    id={id} 
                                    open={open} 
                                    anchorEl={anchorEl} 
                                    onClose={handleClose} 
                                    anchorOrigin={{ vertical: 'center', horizontal: 'left', }} 
                                    transformOrigin={{ vertical: 'center', horizontal: 'right', }}
                                    sx={{
                                        "& .MuiPaper-root": {
                                        backgroundColor: theme.palette.df.grey,
                                        },
                                    }}
                                >
                                    <Box display="flex" gap={1}  sx={{ height: 35 }}>
                                        <a href={ResumePDF} target="_blank" rel="noreferrer" >
                                            <DescriptionOutlined sx={{ color: theme.palette.df.lightGreen, height: 35, width: 35 }}/>
                                        </a>
                                        <a href="mailto:faelkerd@gmail.com" target="_blank" rel="noopener noreferrer" >
                                            <EmailOutlined sx={{ color: theme.palette.df.lightGreen, height: 35, width: 35 }}/>
                                        </a>
                                        <a href="https://github.com/dylanfaelker" target="_blank" rel="noopener noreferrer" >
                                            <GitHub sx={{ color: theme.palette.df.lightGreen, height: 35, width: 35 }}/>
                                        </a>
                                        <a href="https://www.linkedin.com/in/dylanfaelker/" target="_blank" rel="noopener noreferrer" >
                                            <LinkedIn sx={{ color: theme.palette.df.lightGreen, height: 35, width: 35 }}/>
                                        </a>
                                    </Box>
                                </Popover>
                            </> : <>
                                <Box display="flex" gap={1} sx={{ height: 35 }}>
                                    <a href={ResumePDF} target="_blank" rel="noreferrer" >
                                        <DescriptionOutlined sx={{ color: theme.palette.df.lightGreen, height: 35, width: 35 }}/>
                                    </a>
                                    <a href="mailto:faelkerd@gmail.com" target="_blank" rel="noopener noreferrer" >
                                        <EmailOutlined sx={{ color: theme.palette.df.lightGreen, height: 35, width: 35 }}/>
                                    </a>
                                    <a href="https://github.com/dylanfaelker" target="_blank" rel="noopener noreferrer" >
                                        <GitHub sx={{ color: theme.palette.df.lightGreen, height: 35, width: 35 }}/>
                                    </a>
                                    <a href="https://www.linkedin.com/in/dylanfaelker/" target="_blank" rel="noopener noreferrer" >
                                        <LinkedIn sx={{ color: theme.palette.df.lightGreen, height: 35, width: 35 }}/>
                                    </a>
                                </Box>
                            </>
                            }
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        </AppBar>
    )
}

export default Navbar
