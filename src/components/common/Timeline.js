import React from 'react'
import Timepoint from './Timepoint'
import './Timeline.css'

const Timeline = ({ points }) => {
    return (
        <div class='flex-col align-center'>
            <div class="timeline-start">
                <div class="line-start"></div>
            </div>
            {points.map((point) => (
                <Timepoint
                    key={point.id} 
                    point={point}
                    length={points.length}
                />
            ))}
        </div>
    )
}

export default Timeline