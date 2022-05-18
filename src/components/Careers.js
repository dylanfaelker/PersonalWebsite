import React from 'react'
import Career from './Career'
import ResumePDF from '../Resume.pdf'
import { ReactComponent as PageIcon } from '../page.svg'

const Careers = ({ careers }) => {
    return (
        <div className='section'>
            <div class="flex-row">
                <h2>CAREER</h2>
                <a href={ResumePDF} target="_blank" rel="noreferrer">
                    <PageIcon class="contact-large"/>
                </a>
            </div>

            {careers.map((career) => (
                <Career
                    key={career.id} 
                    career={career}
                />
            ))}
        </div>
    )
}

export default Careers
