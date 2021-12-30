import React from 'react'
import Nav from './Nav'

const Navbar = ({ navs, onHover, onClick }) => {
    return (
        <div className='navbar'>
            <h2 className='nav-name' style={{color:'rgb(234, 177, 105)'}}>Dylan Faelker</h2>
            <div className='nav-choice'>
                {navs.map((nav) => (
                    <Nav
                        key={nav.id} 
                        nav={nav}
                        onHover={onHover}
                        onClick={onClick}
                    />
                ))}
            </div>
            
        </div>
    )
}

export default Navbar
