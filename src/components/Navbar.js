import React from 'react'
import Contacts from './Contacts'
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
            <Contacts/>
        </nav>
    )
}

export default Navbar
