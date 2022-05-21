import React from 'react'
import { ReactComponent as InstagramIcon } from '../instagram.svg'
import { ReactComponent as GithubIcon } from '../github.svg'
import { ReactComponent as EmailIcon } from '../email.svg'
import { ReactComponent as LinkedinIcon } from '../linkedin.svg'
import { ReactComponent as PageIcon } from '../page.svg'
import ResumePDF from '../Resume.pdf'
import { Link } from "react-router-dom"

const Navbar = ({ isToTop }) => {
    const goToTop = () => {
        window.scrollTo({
            top: 0
        });
    };

    return (
        <nav class="topnav">
            {isToTop ?
                <h4 class="smallName appear" onClick={goToTop}>DYLAN FAELKER</h4>:
                <Link to="/" class="smallName appear">
                    <h4 onClick={goToTop}>DYLAN FAELKER</h4>
                </Link>
            }
            <div class="contacts">
                <a
                href={ResumePDF}
                target="_blank"
                rel="noreferrer"
                >
                <PageIcon class="contact"/>
                </a>
                <a
                href="mailto:faelkerd@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                >
                <EmailIcon class="contact"/>
                </a>
                <a
                href="https://github.com/dylanfaelker"
                target="_blank"
                rel="noopener noreferrer"
                >
                <GithubIcon class="contact"/>
                </a>
                <a
                href="https://www.linkedin.com/in/dylanfaelker/"
                target="_blank"
                rel="noopener noreferrer"
                >
                <LinkedinIcon class="contact"/>
                </a>
                <a
                href="https://www.instagram.com/d_faelker/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                >
                <InstagramIcon class="contact"/>
                </a>
            </div>
        </nav>
        // <nav className='navbar'>
        //     <h2 className='nav-name'>Dylan Faelker</h2>
        //     <div className='nav-choice'>
        //         {navs.map((nav) => (
        //             <Nav
        //                 key={nav.id} 
        //                 nav={nav}
        //                 onHover={onHover}
        //                 onClick={onClick}
        //             />
        //         ))}
        //     </div>
            
        // </nav>
    )
}

export default Navbar
