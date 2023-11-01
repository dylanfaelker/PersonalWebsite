import React from 'react'
import Timeline from './Timeline'
import ResumePDF from '../Resume.pdf'
import { ReactComponent as PageIcon } from '../page.svg'

const Careers = ({ careers }) => {
    return (
        <div className='section'>
            <div class="flex-row">
                <h2>CAREER</h2>
                <a href={ResumePDF} target="_blank" rel="noreferrer">
                    <PageIcon class="icon-medium icon"/>
                </a>
            </div>

            <Timeline points={careers}/>
        </div>
    )
}

export default Careers
