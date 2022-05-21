import React from 'react'
import Career from './Career'
import ResumePDF from '../Resume.pdf'
import { ReactComponent as PageIcon } from '../page.svg'

const Careers = ({ careers, title }) => {
    return (
        <div className='section'>
            <div class="flex-row">
                <h2>{title}</h2>
                <a href={ResumePDF} target="_blank" rel="noreferrer">
                    <PageIcon class="contact-large"/>
                </a>
            </div>

            <div class="timeline-start flex-column">
                    <div class="line-start"></div>
                </div>
            {careers.map((career) => (
                <Career
                    career={career}
                    length={careers.length}
                />
            ))}
        </div>
    )
}

export default Careers
