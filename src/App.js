import { useState } from 'react'
import profile from './ProfileCircle.png';
import { ReactComponent as InstagramIcon } from './instagram.svg'
import { ReactComponent as GithubIcon } from './github.svg'
import { ReactComponent as EmailIcon } from './email.svg'
import { ReactComponent as LinkedinIcon } from './linkedin.svg'
import './App.css';
import Typer from './components/Typer'
import Projects from './components/Projects'
import Contacts from './components/Contacts'
import Game from './Game'
import About from './About'
import Navbar from './components/Navbar'

function App() {
  const [projects, setProjects] = useState([   
    {
      id: 1,
      name: <h3>Infinity Chess</h3>,
      desc: <div>
              <p className='paragraph'>A game which extends upon the traditional chess experience by adding a feature where the edges of the board wrap. Basically a combination of Pacman and Chess. I am current working on a simple engine so it can be played on this website.</p>
              <p className='paragraph'>Languages and Libraries: Python</p>
            </div>,
      display: true,
      link: 2,
    },
    {
      id: 2,
      name: <h3>Stock Porfolio Creater</h3>,
      desc: <div>
              <p className='paragraph'>Creates an investment portfolio of ten SP500 stocks that is considered risky. It uses data analytics with panda's and numpy so ensure a risky portfolio is chosen.</p>
              <p className='paragraph'>Languages and Libraries: Python, Numpy, Pandas, YFinance</p>
            </div>,
      display: true,
      link: 0,
    },
    {
      id: 3,
      name: <h3>FEN Decoder</h3>,
      desc: <div>
              <p className='paragraph'>FEN (Forsyth–Edwards Notation) is a chess notation used by computer to easily understand a position. To humans, it can be difficult to quickly recognized what is happening. This program parses the FEN chess notation into visualisation a board.</p>
              <p className='paragraph'>Languages and Libraries: Java</p>
            </div>,
      display: true,
      link: 'https://github.com/dylpykill/FENDecoder'
    },
    {
      id: 4,
      name: <h3>Santa's Elf (Incomplete)</h3>,
      desc: <div>
              <p className='paragraph'>A discord bot that will organise secret Santa without the need for a human organiser making it quicker and easier to arrange</p>
              <p className='paragraph'>Languages and Libraries: Python, Discord Bot API</p>
            </div>,
      display: true,
      link: 'https://github.com/dylpykill/Santa-s-Elf'
    },
    {
      id: 5,
      name: <h3>Personal Website (Incomplete)</h3>,
      desc: <div>
              <p className='paragraph'>What you are currently looking at.</p>
              <p className='paragraph'>Languages and Libraries: React.js</p>
            </div>,
      display: true,
      link: 'https://github.com/dylpykill/PersonalWebsite'
    }
  ])

  const [contacts, setContacts] = useState([
    {
      id: 1,
      icon: <InstagramIcon style={{fill:'#366BA8'}}/>,
      iconHighlight: <InstagramIcon style={{fill:'#42afb0'}}/>,
      writting: <p className='contact'>@d_faelker</p>,
      link: "https://www.instagram.com/d_faelker/?hl=en"
    },
    {
      id: 2,
      icon: <GithubIcon style={{fill:'#366BA8'}}/>,
      iconHighlight: <GithubIcon style={{fill:'#42afb0'}}/>,
      writting: <p className='contact'>Dylan Faelker</p>,
      link: "mailto:faelkerd@gmail.com"
    },
    {
      id: 3,
      icon: <EmailIcon style={{fill:'#366BA8'}}/>,
      iconHighlight: <EmailIcon style={{fill:'#42afb0'}}/>,
      writting: <p className='contact'>faelkerd@gmail.com</p>,
      link: "https://github.com/dylpykill"
    },
    {
      id: 4,
      icon: <LinkedinIcon style={{fill:'#366BA8'}}/>,
      iconHighlight: <LinkedinIcon style={{fill:'#42afb0'}}/>,
      writting: <p className='contact'>Dylan Faelker</p>,
      link: "https://www.linkedin.com/in/dylanfaelker/"
    },
  ])

  const [navs, setNavs] = useState([
    {
      id:1,
      name:<h3>Home</h3>,
      link:0,
    },
    {
      id:2,
      name:<h3>About</h3>,
      link:1,
    },
    {
      id:3,
      name:<h3>Infinity Chess</h3>,
      link:2,
    }
  ])

  //0=home, 1=about, 2=infinitychess
  const [pageNum, setPageNum] = useState(0)

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

  const highlightContact =  (id, hover) => (
    setContacts(
      contacts.map((contact) => 
        contact.id === id ? 
          {...contact, hover:hover} : 
          contact
      )
    )
  )

  const highlightNav =  (id, hover) => (
    setNavs(
      navs.map((nav) => 
        nav.id === id ? 
          {...nav, hover:hover} : 
          nav
      )
    )
  )



  //opens a link in a new tab or changes pageNum
  const openInNewTab = (url) => {
    if(isNaN(url)) {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }
    else {
      setPageNum(url)
    }
  }

  return (
    <div>
      <Navbar navs={navs} onHover={highlightNav} onClick={openInNewTab} />
      {pageNum === 0 ?
        <div className="App">
          <header className='wrapper'>
            <img src={profile} className="App-logo" alt="logo"/>
            <header className='App-header'>
              <h1 >
                Dylan Faelker
              </h1>
              <h4 style={{color: 'rgb(207,188,94)'}}>
                I am a
                Sofware Developer,
                CFM student at UWaterloo,
                Runner and
                Amateur Investor
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
            onClick={openInNewTab}
          />

          <Contacts 
            contacts={contacts}
            onHover={highlightContact}
          />
        </div> :
        (pageNum===1 ? 
          <About /> :
          <div>
            <Game />
          </div>
          )
      }
    </div>
  );
}

export default App;
