import React from 'react'
import { useTheme } from '@mui/material'
import { Typography, Box } from '@mui/material'

const Timepoint = ({ point, length }) => {

    const theme = useTheme()

    point.date = point.date.replaceAll('\\n', '\n');
    point.title = point.title.replaceAll('\\n', '\n');
    point.sub = point.sub.replaceAll('\\n', '\n');
    return (
        <Box>
            {(point.id % 2 === 0) ?
            <Box //career-point
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <Box //job
                    sx={{
                        position: 'relative',
                        width: '40vw',
                        height: '127px',
                    }}
                >
                    <Typography   //job-period
                        sx={{
                            color: theme.palette.df.lightGreen,
                            marginLeft: '1vw',
                            marginRight: '1vw',
                            textAlign: 'right',
                        }}
                    >{point.date}</Typography>
                    <Typography  //job-title
                        sx={{
                            marginLeft: '1vw',
                            marginRight: '1vw',
                            textAlign: 'right',
                        }}
                    >{point.title}</Typography>
                    <Typography  //job-location
                        sx={{
                            marginLeft: '1vw',
                            marginRight: '1vw',
                            textAlign: 'right',
                        }}
                    >{point.sub}</Typography>
                </Box>
                <Box //timeline
                    sx={{
                        position: 'relative',
                        height: '127px',
                        width: '36px',
                    }}
                >
                    <Box //doughnut
                        sx={{
                            border: `7px solid ${theme.palette.df.maroon}`,
                            borderRadius: '100px',
                            height: '21px',
                            width: '21px',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                        }}
                    ></Box>
                    {point.id === 1 ?
                    <Box //line-end
                        sx={{
                            backgroundImage: `linear-gradient(${theme.palette.df.maroon}, ${theme.palette.df.darkGreen})`,
                            width: '7px',
                            height: '100px',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            top: '30px',
                        }}
                    ></Box> :
                    <Box //line
                        sx={{
                            backgroundColor: theme.palette.df.maroon,
                            width: '7px',
                            height: '100px',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            top: '30px',
                        }}
                    ></Box>}
                </Box>
                <Box //spacer
                    sx={{
                        width: '40vw',
                        height: '127px',
                    }}
                ></Box>
            </Box> :
            <Box //career-point
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <Box //spacer
                    sx={{
                        width: '40vw',
                        height: '127px',
                    }}
                ></Box>
                <Box //timeline
                    sx={{
                        position: 'relative',
                        height: '127px',
                        width: '36px',
                    }}
                >
                    <Box //doughnut
                        sx={{
                            border: `7px solid ${theme.palette.df.maroon}`,
                            borderRadius: '100px',
                            height: '21px',
                            width: '21px',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                        }}
                    ></Box>
                    {point.id === 1 ?
                    <Box //line-end
                        sx={{
                            backgroundImage: `linear-gradient(${theme.palette.df.maroon}, ${theme.palette.df.darkGreen})`,
                            width: '7px',
                            height: '100px',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            top: '30px',
                        }}
                    ></Box> :
                    <Box //line
                        sx={{
                            backgroundColor: theme.palette.df.maroon,
                            width: '7px',
                            height: '100px',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            top: '30px',
                        }}
                    ></Box>}
                </Box>
                <Box //job
                    sx={{
                        position: 'relative',
                        width: '40vw',
                        height: '127px',
                    }}
                >
                    <Typography  //job-period
                        sx={{
                            color: theme.palette.df.lightGreen,
                            marginLeft: '1vw',
                            marginRight: '1vw',
                            textAlign: 'left',
                        }}
                    >{point.date}</Typography>
                    <Typography  //job-title
                        sx={{
                            marginLeft: '1vw',
                            marginRight: '1vw',
                            textAlign: 'left',
                        }}
                    >{point.title}</Typography>
                    <Typography //job-location
                        sx={{
                            marginLeft: '1vw',
                            marginRight: '1vw',
                            textAlign: 'left',
                        }}
                    >{point.sub}</Typography>
                </Box>
            </Box>}
        </Box>

    )
}

export default Timepoint
