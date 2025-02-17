import { Box, Typography, useTheme } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { Link } from "@mui/material"
import { useState, useEffect } from "react"

const Project = ({ project }) => {

    const theme = useTheme()

    project.desc = project.desc.replaceAll('\\n', '\n')
    project.name = project.name.replaceAll('\\n', '\n')

    const ProjectObject = () =>  {

        const [isHover, setIsHover] = useState(false)
        const [oldIsHover, setOldIsHover] = useState(false)
        const [animationPlayed, setAnimationPlayed] = useState(true)

        useEffect(() => {
            if (isHover !== oldIsHover) {
                setAnimationPlayed(false)
            }
            else {
                setAnimationPlayed(true)
            }
            setOldIsHover(isHover)
        }, [isHover, oldIsHover])
    
        return (
            <Box 
                sx={{ 
                    height: 160,
                    width: 1,
                    border: 5,
                    borderColor: theme.palette.df.lightGreen,
                    position: 'relative',
                }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <Box
                    display='flex'
                    sx={{
                        position: 'absolute',
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 0.8,
                        justifyContent: 'center',
                        animation: animationPlayed
                            ? "none"
                            : isHover 
                            ? "hide 1s forwards" 
                            : "show 1s forwards",
                        "@keyframes show": {
                            "0%": {
                                display: 'none',
                            },
                            "50%": {
                                display: 'none',
                            },
                            "51%": {
                                display: '',
                            },
                            "100%": {
                                display: '',
                            },
                        },
                        "@keyframes hide": {
                            "0%": {
                                display: '',
                            },
                            "50%": {
                                display: '',
                            },
                            "51%": {
                                display: 'none',
                            },
                            "100%": {
                                display: 'none',
                            },
                        },
                    }}
                >
                    <Typography sx={{ color: theme.palette.df.lightGreen, textAlign: 'center' }}>
                        {project.name}
                    </Typography>
                </Box>
                <Box
                    display='flex'
                    sx={{
                        position: 'absolute',
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 0.8,
                        display: animationPlayed ? 'none' : '',
                        animation: animationPlayed
                            ? "none"
                            : isHover 
                            ? "show 1s forwards" 
                            : "hide 1s forwards",
                        "@keyframes show": {
                            "0%": {
                                display: 'none',
                            },
                            "50%": {
                                display: 'none',
                            },
                            "51%": {
                                display: '',
                            },
                            "100%": {
                                display: '',
                            },
                        },
                        "@keyframes hide": {
                            "0%": {
                                display: '',
                            },
                            "50%": {
                                display: '',
                            },
                            "51%": {
                                display: 'none',
                            },
                            "100%": {
                                display: 'none',
                            },
                        },
                    }}
                >
                    <Typography>
                        {project.desc}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        height: 1,
                        width: "0%",
                        backgroundColor: theme.palette.df.lightGreen,
                        position: 'absolute',
                        top: "50%",
                        left: "0%",
                        transform: "translate(-50%, -50%)",
                        animation: animationPlayed
                            ? "none"
                            : isHover 
                            ? "reveal 1s forwards" 
                            : "reveal2 1s forwards",
                        "@keyframes reveal": {
                            "0%": {
                                left: '0%',
                                width: '0%',
                            },
                            "50%": {
                                left: '50%',
                                width: '100%',
                            },
                            "100%": {
                                left: '100%',
                                width: '0%',
                            },
                        },
                        "@keyframes reveal2": {
                            "0%": {
                                left: '0%',
                                width: '0%',
                            },
                            "50%": {
                                left: '50%',
                                width: '100%',
                            },
                            "100%": {
                                left: '100%',
                                width: '0%',
                            },
                        },
                    }}
                />
            </Box>
        )
    }

    return (
        <Box sx={{ width: 1, marginBottom: '20px' }}>
            {project.link ?
            <Link href={project.link} target="_blank" rel="noreferrer" >
                <ProjectObject/>
            </Link>:
            <Link component={RouterLink} to={project.inLink} >
                <ProjectObject/>
            </Link>}
        </Box>
    )
}

export default Project
