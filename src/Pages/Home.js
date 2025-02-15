import { useState, useEffect } from 'react'
import profile from '../assets/ProfileCircle.png';
import { ReactComponent as DownArrow } from '../assets/icons/downArrow.svg'
import { Projects, Careers } from '../components/home'
import { PhotoGallery } from '../components/common'

import './Home.css'

import db from '../firebaseConnection.js'
import { query, orderBy, collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'

function Home() {

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('resize', handleScroll);
      };
  });

  return (
    <div class="page">
      <div>
        {(scrollPosition <= 0) ? 
        <>
          <h1 class="name first">DYLAN</h1>
          <h1 class="name last">FAELKER</h1>
          <DownArrow class="scrollArrow"/>
        </> : <>
          <h1 class="name first firstNameScroll">DYLAN</h1>
          <h1 class="name last lastNameScroll">FAELKER</h1>
          <DownArrow class="disapear scrollArrow"/>
        </>}
        <div class="upperLanding"></div>
        <div class="lowerLanding"></div>
        <div class="main">
          <div class="section">
            <img src={profile} className="profile" alt="Head shot"/>
            <h2 >ABOUT ME</h2>
            <p>
              I am currently taking my undergraduate degree at Waterloo for Computing and Financial Management (BCFM). The program is similar to a double major in Computer Science and Finance.
              I enjoy the problem solving in computer science and the analytics involved with Finance. What better way to combine the two than with data science.
            </p>
            <br></br>
            <p>This website will serve as a personal portfolio of my projects and a little introduction as to who I am.</p>
          </div>
          <ProjectsDatabase/>
          <CareersDatabase/>
          <div class='section'>
            <h2>HOBBIES</h2>
            <div class="flex-row hobbies">
              <div>
                <PhotoGallery images={['hobbyImg/1.jpg', 'hobbyImg/2.jpg', 'hobbyImg/3.jpg', 'hobbyImg/4.jpg', 'hobbyImg/5.jpg', 'hobbyImg/6.jpg', 'hobbyImg/7.jpg']}/>
              </div>
              <div>
                <p>
                  Running has always been important to me since I was able I small child.
                  In grade 10, I trained throughout the summer for cross country in the fall and secured my placement at OFSAA which is something I am still proud of.
                  Since then, I continued to set some PRs but moved my focus to other things.
                </p>
                <br></br>
                <p>
                  In the first summer of the pandemic, I started road biking with a couple big goals in mind. The biggest was biking to Niagara Falls and back (200km) in a day, which I successfully completed in 2020.
                </p>
                <br></br>
                <p>
                  In 2022 I decided to try another new sport. Rock climbing. This is now one my favourites and something I continue to do regularly.
                </p>
                <br></br>
                <p>
                  Once again in 2023, I tried yet another sport, this time it was dragon boat for the UWaterloo Dargon Warriors. We have competed at nationals and have podiumed in multiple regattas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Gets the Timeline for the bot's history from the database
function CareersDatabase() {
  const careerQuery = query(collection(db, 'careers'), orderBy('id', 'desc'));
  const [careers, loading] = useCollectionData(careerQuery, {idField: 'id'});

  if (loading) {
      return (
          <p>Loading</p>
      )
  } else {
      return (
        <Careers careers={careers}/>
      )
  }
}

// Gets the Timeline for the bot's history from the database
function ProjectsDatabase() {
  const projectQuery = query(collection(db, 'projects'), orderBy('id', 'asc'));
  const [projects, loading] = useCollectionData(projectQuery, {idField: 'id'});

  if (loading) {
      return (
          <p>Loading</p>
      )
  } else {
      return (
        <Projects projects={projects}/>
      )
  }
}

export default Home;
