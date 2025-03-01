import { useState, useEffect } from 'react'
import profile from '../assets/images/ProfileCircle.png'
import { Project } from '../components/home'
import { PhotoGallery, SectionTitle, Timeline } from '../components/common'

// import db from '../firebaseConnection.js'
// import { query, orderBy, collection } from 'firebase/firestore';
// import { useCollectionData } from 'react-firebase-hooks/firestore'
import { DescriptionOutlined, KeyboardArrowDownRounded } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material'

import ResumePDF from '../assets/pdfs/Resume.pdf'
import projectsData from '../assets/data/home/ProjectsData.json'
import careersData from '../assets/data/home/CareersData.json'
import { useDispatch } from 'react-redux'
import { setTitle } from '../redux/slice/globalSlice'

function Home() {

  const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  // const isComputer = useMediaQuery(theme.breakpoints.up("lg"))

  const dispatch = useDispatch()
  useEffect(() => {dispatch(setTitle(""))})

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
          background: theme.palette.df.grey,
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
        <SectionTitle>ABOUT ME</SectionTitle>
        <Typography>
          I am currently taking my undergraduate degree at Waterloo for Computing and Financial Management (BCFM). The program is similar to a double major in Computer Science and Finance.
          I enjoy the problem solving in computer science and the analytics involved with Finance. What better way to combine the two than with data science.
          <br></br>
          <br></br>
          This website will serve as a personal portfolio of my projects and a little introduction as to who I am.
        </Typography>

        <Box sx={{ height: 100 }}></Box>

        <SectionTitle>PROJECTS</SectionTitle>
        {projectsData.map((project) => (
            <Project
                key={project.id} 
                project={project}
            />
        ))}

        <Box sx={{ height: 100 }}></Box>

        <Box display='flex' sx={{ alignItems: 'center' }}>
          <SectionTitle>CAREER</SectionTitle>
          <a href={ResumePDF} target="_blank" rel="noreferrer" >
            <DescriptionOutlined sx={{ color: theme.palette.df.lightGreen, height: 75, width: 75 }}/>
          </a>
        </Box>
        <Timeline points={careersData}/>

        <Box sx={{ height: 100 }}></Box>

        <SectionTitle>HOBBIES</SectionTitle>
        <PhotoGallery images={['hobbyImg/1.jpg', 'hobbyImg/2.jpg', 'hobbyImg/3.jpg', 'hobbyImg/4.jpg', 'hobbyImg/5.jpg', 'hobbyImg/6.jpg', 'hobbyImg/7.jpg']}/>
        <Box sx={{ height: 25 }}></Box>
        <Typography>
          Running has always been important to me since I was able I small child.
          In grade 10, I trained throughout the summer for cross country in the fall and secured my placement at OFSAA which is something I am still proud of.
          Since then, I continued to set some PRs but moved my focus to other things.
          <br></br>
          <br></br>
          In the first summer of the pandemic, I started road biking with a couple big goals in mind. The biggest was biking to Niagara Falls and back (200km) in a day, which I successfully completed in 2020.
          <br></br>
          <br></br>
          In 2022 I decided to try another new sport. Rock climbing. This is now one my favourites and something I continue to do regularly.
          <br></br>
          <br></br>
          Once again in 2023, I tried yet another sport, this time it was dragon boat for the UWaterloo Dargon Warriors. We have competed at nationals and have podiumed in multiple regattas.
        </Typography>

        <Box sx={{ height: 100 }}></Box>
      </Box>
    </Box>
  );
}

// Gets the Timeline for the bot's history from the database
// function CareersDatabase() {
//   const careerQuery = query(collection(db, 'careers'), orderBy('id', 'desc'));
//   const [careers, loading] = useCollectionData(careerQuery, {idField: 'id'});

//   if (loading) {
//       return (
//           <p>Loading</p>
//       )
//   } else {
//       return (
//         <Careers careers={careers}/>
//       )
//   }
// }

// // Gets the Timeline for the bot's history from the database
// function ProjectsDatabase() {
//   const projectQuery = query(collection(db, 'projects'), orderBy('id', 'asc'));
//   const [projects, loading] = useCollectionData(projectQuery, {idField: 'id'});

//   if (loading) {
//       return (
//           <p>Loading</p>
//       )
//   } else {
//       return (
//         <Projects projects={projects}/>
//       )
//   }
// }

export default Home;
