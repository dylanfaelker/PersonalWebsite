import React from 'react'
import { useState } from 'react'
import useWindowWidth from '../../hooks/useWindowWidth'
import Contacts from './Contacts'
import HamburgerMenu from './HamburgerMenu'
import { Link } from "react-router-dom"
import './Navbar.css'

const Navbar = ({ pageTitle }) => {

    const { windowWidth } = useWindowWidth()

    const [openMenu, setOpenMenu] = useState(false)

    const goToTop = () => {
        window.scrollTo({
            top: 0
        });
    };

    return (
        <>
            {windowWidth <= 640 ?
                <><nav class="topnav">
                    <Link to="/">
                        <h5 class="smallName nav-left-margin" onClick={goToTop}>DF</h5>
                    </Link>
                    <div class='nav-right-margin' onClick={() => {setOpenMenu(!openMenu)}}><HamburgerMenu/></div>
                </nav>
                {openMenu ? <div class='subnav'><div class='nav-right-margin'><Contacts/></div></div> : <></>} </> : 
            windowWidth >= 641 && windowWidth <= 1007 ?
                <nav class="topnav">
                    <Link to="/">
                        <h5 class="smallName nav-left-margin" onClick={goToTop}>DF</h5>
                    </Link>
                    <div class='nav-right-margin'><Contacts/></div>
                </nav> :
            windowWidth >= 1008 ?
                <nav class="topnav">
                    <Link to="/">
                        <h5 class="smallName nav-left-margin" onClick={goToTop}>DF</h5>
                    </Link>
                    <h5 class="page-title">{pageTitle}</h5>
                    <div class='nav-right-margin'><Contacts/></div>
                </nav> :
            <></>}
        </>
    )
}

export default Navbar
