import React from 'react'
import Contacts from './Contacts'
import { Link } from "react-router-dom"

const Navbar = ({ isToTop, pageTitle }) => {
    const goToTop = () => {
        window.scrollTo({
            top: 0
        });
    };

    return (
        <nav class="topnav">
            {isToTop ?
                <h4 class="smallName appear" onClick={goToTop}>DYLAN FAELKER</h4>:
                <Link to="/" class="smallName">
                    <h4 onClick={goToTop}>DYLAN FAELKER</h4>
                </Link>
            }
            <h4 class="page-title">{pageTitle}</h4>
            <Contacts/>
        </nav>
    )
}

export default Navbar
