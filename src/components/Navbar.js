import React from 'react'
import Contacts from './Contacts'
import { Link } from "react-router-dom"
import '../Navbar.css'

const Navbar = ({ isToTop, pageTitle }) => {
    const goToTop = () => {
        window.scrollTo({
            top: 0
        });
    };

    return (
        <div>
            <nav class="topnav">
                {isToTop ?
                    <h5 class="smallName appear" onClick={goToTop}>DYLAN FAELKER</h5>:
                    <Link to="/" class="smallName">
                        <h5 onClick={goToTop}>DYLAN FAELKER</h5>
                    </Link>
                }
                <h5 class="page-title">{pageTitle}</h5>
                <Contacts/>
            </nav>
            <div class='nav-spacer'></div>
        </div>
    )
}

export default Navbar
