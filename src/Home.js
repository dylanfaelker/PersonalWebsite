import { useState, useEffect } from 'react'
import profile from './ProfileCircle.png';
import { ReactComponent as DownArrow } from './downArrow.svg'
import Projects from './components/Projects'
import Navbar from './components/Navbar'
import Careers from './components/Careers'
import Contacts from './components/Contacts'
import PhotoGallery from './components/PhotoGallery'

import './Home.css'
import './Contacts.css'

import db from './firebaseConnection.js'
import { query, orderBy, collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'

function Home() {

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
  };
  // const handleResize = () => {
  //   const position = window.pageYOffset;
  //   const size = Math.max(0.01*window.innerHeight, 0.5*window.innerHeight - position);
  //   setNavbarSize(size);
  // };

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
      {(scrollPosition <= 0) ?
      <div>
        <div class="upperLanding">
          <Contacts/>
          <h1 class="name first">DYLAN</h1>
        </div>
        <div class="lowerLanding">
          <h1 class="name last">FAELKER</h1>
          <DownArrow class="scrollArrow"/>
        </div>
      </div> :
      <div>
        <Navbar isToTop={true} />
        <h1 class="name first firstNameScroll">DYLAN</h1>
        <div class="upperLandingScroll"></div>
        <div>
          <h1 class="name last lastNameScroll">FAELKER</h1>
          <DownArrow class="disapear scrollArrow"/>
        </div>
        <div class="main">
          <div class="section">
            <img src={profile} className="profile" alt="logo"/>
            <h2 >ABOUT ME</h2>
            <p>I am currently taking my undergraduate degree at Waterloo for Computing and Financial Management (BCFM). The program is similar to a double major in Computer Science and Finance.</p>
            <br></br>
            <p>In high school, I really enjoyed analysing a company in grade 12 accounting and I liked the problem solving in computer science.</p>
            <br></br>
            <p>I am also inspired by the growth of fintech and look forward to opportunities to bring my knowledge of computing and financial management to use.</p>
          </div>
          <ProjectsDatabase/>
          <CareersDatabase/>
          <div class='section'>
            <h2>HOBBIES</h2>
            <div class="flex-row hobbies">
              <div>
                <PhotoGallery/>
              </div>
              <div>
                <p>
                  Running has always been important to me since I was able I small child.
                  In grade 10, I trained throughout the summer for cross country in the fall and secured my placement at OFSAA which is something I am still proud of.
                  Since then, I continued to set PRs year after year but taken things a little easier.
                </p>
                <br></br>
                <p>
                  In the first summer of the pandemic, I started road biking with a couple big goals in mind. The biggest was biking to Niagara Falls and back (200km) in a day, which I successfully completed in 2020.
                </p>
                <br></br>
                <p>
                  In 2022 I decided to try another new sport. Rock climbing. This is now one my favourites and something I regularlly do.
                </p>
                <br></br>
                <p>
                  Once again in 2023, I tried yet another sport, this time it was dragon boat for the UWaterloo Dargon Warriors. We have competed at nationals and have podiumed in multiple regattas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>}
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
