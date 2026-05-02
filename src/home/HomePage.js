import { useState, useEffect } from 'react'
import profile from './assets/Profile.jpg'
import { ProjectCard } from './components'
import { SectionTitle, Timeline } from '../commonComponents'

import { DescriptionOutlined, KeyboardArrowDownRounded } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material'

import ResumePDF from '../commonAssets/pdfs/Resume.pdf'
import projectsData from './data/ProjectsData.json'
import careersData from './data/CareersData.json'
import usePageTitle from '../commonHooks/usePageTitle'

function HomePage() {

  const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  // const isComputer = useMediaQuery(theme.breakpoints.up("lg"))

  usePageTitle('')

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
      const position = window.pageYOffset
      setScrollPosition(position)
  }

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleScroll, { passive: true })

      return () => {
          window.removeEventListener('scroll', handleScroll)
          window.removeEventListener('resize', handleScroll)
      }
  })

  return (
    <Box type='flex' sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', backgroundColor: theme.palette.df.darkGreen }}>
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Box sx={{
          height: '50vh',
          width: '100%',
          background: theme.palette.df.darkGrey,
        }}/>
        <Box sx={{
          height: '50vh',
          width: '100%',
          background: theme.palette.df.darkGreen,
        }}/>
        {(scrollPosition <= 0) ? 
        <>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography variant='h1'
              sx={{ 
                color: theme.palette.df.white,
                textAlign: 'center',
                fontSize: 'clamp(50px, 21vmin, 250px)',
                lineHeight: '85%',
                animation: "enter 0.2s ease-out",
                "@keyframes enter": {
                  "0%": {
                    opacity: 0,
                    lineHeight: '400%',
                  },
                  "95%": {
                    opacity: 1,
                  },
                  "100%": {
                    lineHeight: '85%',
                  },
                },
              }}
            >
              DYLAN
            </Typography>
            <Typography variant='h1'
              sx={{ 
                color: theme.palette.df.lightGreen,
                textAlign: 'center',
                fontSize: 'clamp(50px, 21vmin, 250px)',
                lineHeight: '85%',
                animation: "enter 0.2s ease-out",
                "@keyframes enter": {
                  "0%": {
                    opacity: 0,
                    lineHeight: '400%',
                  },
                  "95%": {
                    opacity: 1,
                  },
                  "100%": {
                    lineHeight: '85%',
                  },
                },
              }}
            >
              FAELKER
            </Typography>
          </Box>
          <KeyboardArrowDownRounded 
            sx={{
              color: theme.palette.df.lightGreen,
              height: 52,
              width: 52,
              position: 'fixed',
              bottom: '1%',
              left: '50%',
              transform: 'translate(-50%,0)',
              animation: "bounce 1s ease-in-out infinite",
              "@keyframes bounce": {
                "0%": {
                  bottom: '3%',
                },
                "50%": {
                  bottom: '1%',
                },
                "100%": {
                  bottom: '3%',
                },
              },
            }}
          />
        </> : <>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography variant='h1'
              sx={{ 
                color: theme.palette.df.white,
                textAlign: 'center',
                fontSize: 'clamp(50px, 21vmin, 250px)',
                lineHeight: '85%',
                animation: "leave 0.2s ease-out forwards",
                "@keyframes leave": {
                  "0%": {
                    opacity: 1,
                    lineHeight: '85%',
                  },
                  "100%": {
                    opacity: '0',
                    lineHeight: '300%',
                    display: 'none'
                  },
                },
              }}
            >
              DYLAN
            </Typography>
            <Typography variant='h1'
              sx={{ 
                color: theme.palette.df.lightGreen,
                textAlign: 'center',
                fontSize: 'clamp(50px, 21vmin, 250px)',
                lineHeight: '85%',
                animation: "leave 0.2s ease-out forwards",
                "@keyframes leave": {
                  "0%": {
                    opacity: 1,
                    lineHeight: '85%',
                  },
                  "100%": {
                    opacity: '0',
                    lineHeight: '300%',
                    display: 'none'
                  },
                },
              }}
            >
              FAELKER
            </Typography>
          </Box>
          <KeyboardArrowDownRounded 
            sx={{
              color: theme.palette.df.lightGreen,
              height: 52,
              width: 52,
              position: 'fixed',
              bottom: '1%',
              left: '50%',
              transform: 'translate(-50%,0)',
              animation: "bounce 1s ease-in-out infinite, disapear 0.1s forwards",
              "@keyframes bounce": {
                "0%": {
                  bottom: '3%',
                },
                "50%": {
                  bottom: '1%',
                },
                "100%": {
                  bottom: '3%',
                },
              },
              "@keyframes disapear": {
                "0%": {
                  opacity: 1,
                },
                "100%": {
                  opacity: 1,
                  display: 'none',
                },
              },
            }}
          />
        </>}
      </Box>
      <Box type='flex' sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', width: '60vw' }}>
        <Avatar src={profile} sx={{ width: '40vmin', height: '40vmin' }}></Avatar>
        <SectionTitle>About Me</SectionTitle>
        <Typography>
          I am a quantitative and investment analyst with interests at the intersection of computer science, finance and statistics.
          I completed my undergraduate degree at Waterloo for Computer Science and Financial Management (BCFM). The program is essentially a double major.
          <br></br>
          <br></br>
          I enjoy working on problems that combine quantitative think with practical implementation. 
          This involves developing optimisation models for porfolio allocation or building machine learning models for financial signals.
          <br></br>
          <br></br>
          This website will serve as a personal portfolio for my side projects and a little introduction for who I am.
        </Typography>

        <Box sx={{ height: 100 }}></Box>

        <SectionTitle>PROJECTS</SectionTitle>
        {projectsData.map((project) => (
            <ProjectCard
                key={project.id} 
                project={project}
            />
        ))}

        <Box sx={{ height: 100 }}></Box>

        <Box display='flex' sx={{ alignItems: 'center' }}>
          <SectionTitle>CAREER</SectionTitle>
          <a href={ResumePDF} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <DescriptionOutlined sx={{ color: theme.palette.df.lightGreen, height: 75, width: 75 }}/>
          </a>
        </Box>
        <Timeline points={careersData}/>

        <Box sx={{ height: 100 }}></Box>

      </Box>
    </Box>
  );
}

export default HomePage;
