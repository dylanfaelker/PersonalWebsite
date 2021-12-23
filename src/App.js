import { useState } from 'react'
import profile from './ProfileCircle.png';
import './App.css';
import Typer from './components/Typer'
import Projects from './components/Projects'

function App() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: <h3>Stock Porfolio Creater</h3>,
      desc: <div>
              <p className='paragraph'>Creates an investment portfolio of ten SP500 stocks that is considered risky. It uses data analytics with panda's and numpy so ensure a risky portfolio is chosen.</p>
              <p className='paragraph'>Languages and Libraries: Python, Numpy, Pandas, YFinance</p>
            </div>,
      display: true,
      link: false
    },
    {
      id: 2,
      name: <h3>FEN Decoder</h3>,
      desc: <div>
              <p className='paragraph'>FEN (Forsyth–Edwards Notation) is a chess notation used by computer to easily understand a position. To humans, it can be difficult to quickly recognized what is happening. This program parses the FEN chess notation into visualisation a board.</p>
              <p className='paragraph'>Languages and Libraries: Java</p>
            </div>,
      display: true,
      link: 'https://github.com/dylpykill/FENDecoder'
    },
    {
      id: 3,
      name: <h3>Infinity Chess (Incomplete)</h3>,
      desc: <div>
              <p className='paragraph'>A game which extends upon the traditional chess experience by adding a feature where the edges of the board wrap. Basically a combination of Pacman and Chess.</p>
              <p className='paragraph'>Languages and Libraries: Python</p>
            </div>,
      display: true,
      link: 'https://github.com/dylpykill/InfinityChess'
    },
    {
      id: 4,
      name: <h3>Santas Elf (Incomplete)</h3>,
      desc: <div>
              <p className='paragraph'>A discord bot that will organise secret Santa without the need for a human organiser making it quicker and earier to arrange</p>
              <p className='paragraph'>Languages and Libraries: Python, Discord Bot API</p>
            </div>,
      display: true,
      link: 'https://github.com/dylpykill/Santa-s-Elf'
    }
  ])

  //Show description
  const showDesc = (id, display) => (
    setProjects(
      projects.map((project) => 
        project.id === id ? 
          {...project, display:display} : 
          project
      )
    )
  )

  //go to a link
  const toLink = (link) => (
    window.location.assign(link)
  )



  return (
    <div className="App">
      <header className='wrapper'>
        <img src={profile} className="App-logo" alt="logo"/>
        <header className='App-header'>
          <h1 >
            Dylan Faelker
          </h1>
          <h4 style={{color: 'rgb(207,188,94)'}}>
            I am a 
            {/*do the typing thing matthew has. describers are 
            Sofware Developer,
            CFM student at UWaterloo,
            Runner,
            Amature investor, */}
          </h4>
          {/* <h4>
            I am a 
            <Typer 
              cycleWords={['Software Developer',
                          'CFM student at UWaterloo',
                          'Amature investor', 
                          'Runner']}
            />
          </h4> */}
        </header>
      </header>

      <Projects 
        projects={projects}
        onHover={showDesc}
      />

      <header className='section'>
        <h1 className='header'>
          Contacting Me
        </h1>
        <a 
          className='contactlink'
          href="https://www.instagram.com/d_faelker/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className='contact'>Instagram: @d_faelker</p> {/* make is so there is no underline*/}
        </a>
        <a 
          className='contactlink'
          href="mailto:faelkerd@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className='contact'>Email: faelkerd@gmail.com</p>
        </a>
        <a href="https://github.com/dylpykill"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className='contact'>Github: Dylan Faelker</p>
        </a>
        <a href="https://www.linkedin.com/in/dylanfaelker/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className='contact'>Linkedin: Dylan Faelker</p>
        </a>
      </header>
    </div>
  );
}

export default App;
