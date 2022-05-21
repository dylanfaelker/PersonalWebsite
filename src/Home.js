import { useState, useEffect } from 'react'
import profile from './ProfileCircle.png';
import { ReactComponent as DownArrow } from './downArrow.svg'
import './App.css'
import Projects from './components/Projects'
import Navbar from './components/Navbar'
import Careers from './components/Careers'
import Contacts from './components/Contacts'

import Hobby10kmRun from './HobbyPics/10kmRun.jpg'
import HobbyAdventureRun from './HobbyPics/AdventureRun.jpg'
import HobbyCityBike from './HobbyPics/CityBike.jpg'
import HobbyNiagaraBike from './HobbyPics/NiagaraBike.jpg'
import HobbyOFSAA from './HobbyPics/OFSAA.jpg'
import HobbySantaRun from './HobbyPics/SantaRun.png'

function Home() {
  const [projects] = useState([   
    {
      id: 1,
      name: <h3>Infinity Chess + Chess AI (Abbott)</h3>,
      desc: "A game which extends upon the traditional chess experience by adding a feature where the edges of the board wrap. Basically a combination of Pacman and Chess. I have also made an engine so it can be played on this website, however it is weak. \n \n Languages and Libraries: React.js",
      display: true,
      link: null,
      inLink: "/InfinityChess",
    },
    {
      id: 2,
      name: <h3>Stock Porfolio Creater</h3>,
      desc: "Creates an investment portfolio of ten SP500 stocks that is considered risky. It uses data analytics with panda's and numpy to ensure a risky portfolio is chosen. \n \n Languages and Libraries: Python, Numpy, Pandas, YFinance",
      display: true,
      link: 'https://github.com/dylpykill/StockPortfolioCreater',
    },
    {
      id: 3,
      name: <h3>Personal Website</h3>,
      desc: "What you are currently looking at. \n \n Designed with Figma. Languages and Libraries: React.js",
      display: true,
      link: 'https://github.com/dylpykill/PersonalWebsite'
    },
    {
      id: 4,
      name: <h3>FEN Decoder</h3>,
      desc: "FEN (Forsyth–Edwards Notation) is a chess notation used by computers to easily understand a position. To humans, it can be difficult to quickly recognize what is happening. This program parses the FEN chess notation into a visual chess board. \n \n Languages and Libraries: Java",
      display: true,
      link: 'https://github.com/dylpykill/FENDecoder'
    },
    {
      id: 5,
      name: <h3>Santa's Elf (Incomplete)</h3>,
      desc: "A discord bot that will organise secret Santa without the need for a human organiser making it quicker and easier to arrange. \n \n Languages and Libraries: Python, Discord Bot API",
      display: true,
      link: 'https://github.com/dylpykill/Santa-s-Elf'
    },
  ])

  const careers = [
    {
      id: 1,
      title: "SOCCER REFEREE",
      location: "Oakville Soccer Club",
      date: "June 2018 - August 2018",
    },
    {
      id: 2,
      title: "SLIDE GUARD/CASHIER",
      location: "Town of Oakville",
      date: "September 2018 - September 2019",
    },
    {
      id: 3,
      title: "LIFEGUARD/SWIM INSTRUCTOR",
      location: "Town of Oakville",
      date: "September 2019 - September 2021",
    },
    {
      id: 4,
      title: "SOFTWARE DEVELOPER",
      location: "Idea Notion Development Inc",
      date: "May 2022 - August 2022",
    },
  ]

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
  }, []);

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
        <div class="upperLanding"></div>
        <div>
          <h1 class="name last lastNameScroll">FAELKER</h1>
          <DownArrow class="scrollArrow disapear"/>
        </div>
        <div class="main">
          <div class="section">
            <img src={profile} className="profile" alt="logo"/>
            <h2 >ABOUT ME</h2>
            <p>I am currently taking my undergraduate degree at Waterloo for Computing and Financial Management (BCFM). The program is similar to a double major in Computer Science and Finance.</p>
            <br></br>
            <p>In high school, I really enjoyed analysing a company in grade 12 accounting and I liked the problem solving in computer science.</p>
            <br></br>
            <p>I am also inspired by the growth of fintech and look forawrd to opportunities to bring my knowledge of computing and financial management to use.</p>
          </div>
          <Projects 
            projects={projects}
          />
          <Careers careers={careers}/>
          <div class='section'>
            <h2>HOBBIES</h2>
            <div class="flex-row">
              <div class="photo-gallery">
                <img src={Hobby10kmRun} alt="Running a 10km" class="hobby-pic"/>
                <img src={HobbyAdventureRun} alt="Running an Adventure Run" class="hobby-pic"/>
                <img src={HobbyCityBike} alt="Riding a bike in a city" class="hobby-pic"/>
                <img src={HobbyNiagaraBike} alt="Bike a Niagara Falls" class="hobby-pic"/>
                <img src={HobbyOFSAA} alt="Group pic at OFSAA" class="hobby-pic"/>
                <img src={HobbySantaRun} alt="Group pic at Santa race" class="hobby-pic"/>
              </div>
              <div class="hobbies">
                <p>
                  Running has always been important to me. In grade 3, I joined the cross country team and continued with the sport all the way until grade 12 where it was cancelled due to COVID.
                  In grade 9, I started taking it seriously when I signed up for my first race with my mom. It was a 10km and I came 3rd in my age group.
                  In grade 10, I trained throughout the summer for cross country in the fall and secured my placement at OFSAA which is something I am still proud of.
                  I took a break for a while but once COVID hit, I used running as something to do and ran over 1000 miles in 2020. 
                </p>
                <br></br>
                <p>
                  In the first summer of the pandemic, I started road biking with a couple big goals in mind. The first two were biking to the CN Tower in Toronto and back (100km), something I have now done 3 times, and biking to Niagara Falls and back (200km).
                </p>
                <br></br>
                <p>
                  My final goal was a half Ironman. I had planned to try one in the summer of 2021 but COVID had other plans. I still hope to do one soon, and eventually complete even a full Ironman.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default Home;
